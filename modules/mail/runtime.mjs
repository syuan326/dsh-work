import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { realpathSync } from 'node:fs';
import path from 'node:path';

/**
 * Resolve a package from the running dsh installation, so a plugin loaded from
 * a linked workspace directory shares the very module instances the host
 * already uses (a second copy would break scope-key identity).
 */
function bases() {
  const out = [];
  if (process.env.DSH_INSTALL_DIR) out.push(path.join(process.env.DSH_INSTALL_DIR, 'package.json'));
  if (process.argv[1]) {
    const argv = path.resolve(process.argv[1]);
    try { out.push(realpathSync(argv)) } catch { /* keep the raw path */ }
    out.push(argv);
  }
  if (process.env.DSH_PROFILE_DIR) out.push(path.join(process.env.DSH_PROFILE_DIR, 'package.json'));
  return out;
}

const resolvers = [];
for (const base of bases()) {
  try { resolvers.push(createRequire(base)) } catch { /* next candidate */ }
}
if (!resolvers.length) throw new Error('split-mail: cannot locate the running dsh installation');

export async function dsh(name) {
  for (const resolver of resolvers) {
    let file;
    try { file = resolver.resolve(name) } catch { continue }
    return import(pathToFileURL(file).href);
  }
  throw new Error(`split-mail: cannot resolve ${name} from the dsh installation`);
}
