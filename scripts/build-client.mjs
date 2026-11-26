import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const names = ['mail', 'planner', 'plans', 'notes', 'ledger', 'modes'];
const factories = names.map(name => {
  const text = fs.readFileSync(path.join(root, 'modules', name, 'client.js'), 'utf8');
  const match = text.match(/^window\.__ModuleLoader__\.load\(\{\s*id:\s*['"][^'"]+['"],\s*factory\(require\)\s*\{([\s\S]*)\n\s*\},?\s*\}\);\s*$/);
  if (!match) throw new Error('Unexpected Client artifact wrapper: ' + name);
  return `function create_${name}(require) {${match[1]}\n}\n`;
});
const output = `// Generated from the workspace module factories by scripts/build-client.mjs.\nwindow.__ModuleLoader__.load({\n  id: '@local/dsh-personal-workspace',\n  factory(require) {\n${factories.join('\n')}\n    const views = [${names.filter(name => name !== 'modes').map(name => `create_${name}(require)`).join(', ')}];\n    const modes = create_modes(require);\n    return { inject: ['slots', 'locale'], apply(ctx) {\n      for (const view of views) ctx.effect(() => view.apply(ctx));\n      ctx.inject(modes.inject, scoped => scoped.effect(() => modes.apply(scoped)));\n    } };\n  },\n});\n`;
fs.writeFileSync(path.join(root, 'client.js'), output);
console.log('Built one Client artifact from ' + names.length + ' modules');
