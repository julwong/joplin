/* ! markmap-lib v0.6.1 | MIT License */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function escapeHtml(html) {
	return html.replace(/[&<"]/g, m => ({
		'&': '&amp;',
		'<': '&lt;',
		'"': '&quot;',
	})[m]);
}
function htmlOpen(tagName, attrs) {
	const attrStr = attrs ? Object.entries(attrs).map(([key, value]) => {
		if (value == null || value === false) return;
		key = ` ${escapeHtml(key)}`;
		if (value === true) return key;
		return `${key}="${escapeHtml(value)}"`;
	}).filter(Boolean).join('') : '';
	return `<${tagName}${attrStr}>`;
}
function htmlClose(tagName) {
	return `</${tagName}>`;
}
function wrapHtml(tagName, content, attrs) {
	return htmlOpen(tagName, attrs) + (content || '') + htmlClose(tagName);
}
function wrapStyle(text, style) {
	if (style.code) text = wrapHtml('code', text);
	if (style.del) text = wrapHtml('del', text);
	if (style.em) text = wrapHtml('em', text);
	if (style.strong) text = wrapHtml('strong', text);
	return text;
}

exports.escapeHtml = escapeHtml;
exports.htmlClose = htmlClose;
exports.htmlOpen = htmlOpen;
exports.wrapHtml = wrapHtml;
exports.wrapStyle = wrapStyle;
