const fs = require('fs-extra');
const { dirname } = require('../pathUtils');

const rootDir = dirname(__dirname);
const assetsDir = `${rootDir}/assets`;

async function copyFile(source, dest) {
	const fullDest = `${assetsDir}/${dest}`;
	const dir = dirname(fullDest);
	await fs.mkdirp(dir);
	await fs.copy(source, fullDest);
}

async function main() {
	await fs.remove(assetsDir);

	await copyFile(`${rootDir}/node_modules/katex/dist/katex.min.css`, 'katex/katex.css');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff2`, 'katex/fonts/KaTeX_Main-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Main-Bold.woff2`, 'katex/fonts/KaTeX_Main-Bold.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2`, 'katex/fonts/KaTeX_Main-BoldItalic.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Main-Italic.woff2`, 'katex/fonts/KaTeX_Main-Italic.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff2`, 'katex/fonts/KaTeX_Math-Italic.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2`, 'katex/fonts/KaTeX_Math-BoldItalic.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Size1-Regular.woff2`, 'katex/fonts/KaTeX_Size1-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Size2-Regular.woff2`, 'katex/fonts/KaTeX_Size2-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Size3-Regular.woff2`, 'katex/fonts/KaTeX_Size3-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Size4-Regular.woff2`, 'katex/fonts/KaTeX_Size4-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_AMS-Regular.woff2`, 'katex/fonts/KaTeX_AMS-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2`, 'katex/fonts/KaTeX_Caligraphic-Bold.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2`, 'katex/fonts/KaTeX_Caligraphic-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2`, 'katex/fonts/KaTeX_Fraktur-Bold.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2`, 'katex/fonts/KaTeX_Fraktur-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2`, 'katex/fonts/KaTeX_SansSerif-Bold.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2`, 'katex/fonts/KaTeX_SansSerif-Italic.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2`, 'katex/fonts/KaTeX_SansSerif-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Script-Regular.woff2`, 'katex/fonts/KaTeX_Script-Regular.woff2');
	await copyFile(`${rootDir}/node_modules/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2`, 'katex/fonts/KaTeX_Typewriter-Regular.woff2');

	await copyFile(`${rootDir}/node_modules/highlight.js/styles/atom-one-light.css`, 'highlight.js/atom-one-light.css');
	await copyFile(`${rootDir}/node_modules/highlight.js/styles/atom-one-dark-reasonable.css`, 'highlight.js/atom-one-dark-reasonable.css');

	await copyFile(`${rootDir}/node_modules/mermaid/dist/mermaid.min.js`, 'mermaid/mermaid.min.js');
	await copyFile(`${rootDir}/MdToHtml/rules/mermaid_render.js`, 'mermaid/mermaid_render.js');

	await copyFile(`${rootDir}/node_modules/d3/dist/d3.min.js`, 'markmap/d3.min.js');
	await copyFile(`${rootDir}/node_modules/mathjax/es5/tex-svg.js`, 'markmap/tex-svg.js');
	await copyFile(`${rootDir}/node_modules/markmap-lib/dist/view.min.js`, 'markmap/view.min.js');
	await copyFile(`${rootDir}/MdToHtml/rules/markmap/mathjax_render.js`, 'markmap/mathjax_render.js');
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
