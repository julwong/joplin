/* ! markmap-lib v0.6.1 | MIT License */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const util = require('./util');

// const template = "<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n<title>Markmap</title>\n<style>\n* {\n  margin: 0;\n  padding: 0;\n}\n#mindmap {\n  display: block;\n  width: 100vw;\n  height: 100vh;\n}\n</style>\n<!--JS-->\n</head>\n<body>\n<svg id=\"mindmap\"></svg>\n<script>markmap.markmap('svg#mindmap',{/*extra*/}).fit()</script>\n</body>\n</html>\n";
const template = '<div><!--JS-->\n<svg id="123"></svg>\n<script>markmap.markmap(\'svg#123\',{/*extra*/}).fit();console.log(\'abc\');</script></div>';
const js = [{
	src: 'https://cdn.jsdelivr.net/npm/d3@5',
}, {
	src: 'https://cdn.jsdelivr.net/npm/markmap-lib@0.6.1/dist/view.min.js',
}];

function buildCode(fn) {
	return `(${fn.toString()})()`;
}

function fillTemplate(data, id, opts) {
	const jsList = [...js];
	const extra = [JSON.stringify(data)];

	if (opts == null ? void 0 : opts.mathJax) {
		jsList.push(buildCode(() => {
			window.MathJax = {
				options: {
					skipHtmlTags: {
						'[-]': ['code', 'pre'],
					},
				},
			};
		}), {
			src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',
		});
		extra.push(buildCode(() => ({
			processHtml: nodes => {
				let _MathJax$typeset, _MathJax;

				(_MathJax$typeset = (_MathJax = window.MathJax).typeset) == null ? void 0 : _MathJax$typeset.call(_MathJax, nodes);
			},
		})));
	}

	const jsStr = jsList.map(data => util.wrapHtml('script', typeof data === 'string' ? data : '', typeof data === 'string' ? null : data)).join('');
	const html = template.replace('<!--ID-->', '123').replace('<!--JS-->', jsStr).replace('{/*extra*/}', extra.join(','));
	return html;
}

exports.fillTemplate = fillTemplate;
