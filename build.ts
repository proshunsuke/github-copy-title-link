import * as path from 'path';
import { build } from 'esbuild';
import packageJson from './package.json';
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp';

const watch = process.env.WATCH === 'true' || false;

const userScriptBanner = `
// ==UserScript==
// @name         ${packageJson.name}
// @namespace    https://github.com
// @version      ${packageJson.version}
// @description  ${packageJson.description}
// @include      /^https://github.com/.*/pull/\\d*/
// @include      /^https://github.com/.*/issues/\\d*/
// @author       ${packageJson.author}
// @license      ${packageJson.license}
// @grant        none
// ==/UserScript==`.trim();

build({
  entryPoints: [path.resolve(__dirname, 'src/index.ts')],
  bundle: true,
  outfile: 'github-copy-title-link.user.js',
  platform: 'browser',
  watch: watch && {
    onRebuild() {
      // eslint-disable-next-line no-console
      console.log('rebuild');
    },
  },
  banner: {
    js: userScriptBanner,
  },
  plugins: [pnpPlugin()],
})
  // eslint-disable-next-line no-console
  .then(() => console.log(watch ? 'watching...' : 'Done.'))
  .catch(() => process.exit(1));
