'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const transform = require('./transform.common').transform;
// const util = require('./util');

function style() {
	return [
		{ name: 'd3.min.js' },
		{ name: 'mathjax_render.js' },
		{ name: 'tex-svg.js' },
		{ name: 'view.js' },
		{ name: 'markmap_render.js' },
		{
			inline: true,
			text: '#mindmap { background-color: white; width: 100%; height: 768px; }',
			mime: 'text/css',
		},
	];
}
function addContextAssets(context) {
	if ('markmap' in context.pluginAssets) { return; }
	context.pluginAssets['markmap'] = style();
}
// @ts-ignore: Keep the function signature as-is despite unusued arguments
function installRule(markdownIt, mdOptions, ruleOptions, context) {
	const defaultRender = markdownIt.renderer.rules.fence || function(tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options, env, self);
	};
	markdownIt.renderer.rules.fence = function(tokens, idx, options, env, self) {
		const token = tokens[idx];
		if (token.info !== 'markmap') { return defaultRender(tokens, idx, options, env, self); }
		addContextAssets(context);
		// const contentHtml = markdownIt.utils.escapeHtml(token.content);
		const data = transform(token.content);
		// const markmapHtml = fillTemplate(data);
		// const abc = `
		// 	<div class="joplin-editable">
		// 		<pre class="joplin-source" data-joplin-language="markmap" data-joplin-source-open="\`\`\`markmap&#10;" data-joplin-source-close="&#10;\`\`\`&#10;">${contentHtml}</pre>
		//         <div class="markmap">${contentHtml}</div>
		// 	</div>
		// `;
		return `
			<div class="joplin-editable">
                <svg id="mindmap" data-js="${encodeURI(JSON.stringify(data))}"></svg>
			</div>
		`;
	};
}
exports.default = {
	install: function(context, ruleOptions) {
		return function(md, mdOptions) {
			installRule(md, mdOptions, ruleOptions, context);
		};
	},
	style: style,
};
