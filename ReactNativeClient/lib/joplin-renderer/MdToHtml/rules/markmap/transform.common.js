/* ! markmap-lib v0.6.1 | MIT License */
'use strict';

const remarkable = require('remarkable');
const util = require('./util');

const md = new remarkable.Remarkable();
md.block.ruler.enable(['deflist']);

function extractInline(token) {
	const html = [];
	let style = {};

	for (const child of token.children) {
		if (child.type === 'text') {
			html.push(util.wrapStyle(util.escapeHtml(child.content), style));
		} else if (child.type === 'code') {
			html.push(util.wrapHtml('code', util.wrapStyle(util.escapeHtml(child.content), style)));
		} else if (child.type === 'softbreak') {
			html.push('<br/>');
		} else if (child.type.endsWith('_open')) {
			const type = child.type.slice(0, -5);

			if (type === 'link') {
				html.push(util.htmlOpen('a', {
					href: child.href,
					title: child.title,
					target: '_blank',
					rel: 'noopener noreferrer',
				}));
			} else {
				style = { ...style,
					[type]: true,
				};
			}
		} else if (child.type.endsWith('_close')) {
			const type = child.type.slice(0, -6);

			if (type === 'link') {
				html.push(util.htmlClose('a'));
			} else {
				style = { ...style,
					[type]: false,
				};
			}
		}
	}

	return html.join('');
}

function cleanNode(node, depth = 0) {
	if (node.t === 'heading') {
		// drop all paragraphs
		node.c = node.c.filter(item => item.t !== 'paragraph');
	} else if (node.t === 'list_item') {
		let _node$p;

		// keep first paragraph as content of list_item, drop others
		node.c = node.c.filter(item => {
			if (item.t === 'paragraph') {
				if (!node.v) node.v = item.v;
				return false;
			}

			return true;
		});

		if (((_node$p = node.p) == null ? void 0 : _node$p.index) != null) {
			node.v = `${node.p.index}. ${node.v}`;
		}
	} else if (node.t === 'ordered_list') {
		let _node$p$start, _node$p2;

		let index = (_node$p$start = (_node$p2 = node.p) == null ? void 0 : _node$p2.start) != null ? _node$p$start : 1;
		node.c.forEach(item => {
			if (item.t === 'list_item') {
				item.p = { ...item.p,
					index: index,
				};
				index += 1;
			}
		});
	}

	if (node.c.length === 0) {
		delete node.c;
	} else {
		if (node.c.length === 1 && !node.c[0].v) {
			node.c = node.c[0].c;
		}

		node.c.forEach(child => cleanNode(child, depth + 1));
	}

	node.d = depth;
	delete node.p;
}

function buildTree(tokens) {
	// TODO deal with <dl><dt>
	const root = {
		t: 'root',
		d: 0,
		v: '',
		c: [],
	};
	const stack = [root];
	let depth = 0;

	for (const token of tokens) {
		let current = stack[stack.length - 1];

		if (token.type.endsWith('_open')) {
			const type = token.type.slice(0, -5);
			const payload = {};

			if (type === 'heading') {
				depth = token.hLevel;

				let _current;

				while (((_current = current) == null ? void 0 : _current.d) >= depth) {
					stack.pop();
					current = stack[stack.length - 1];
				}
			} else {
				let _current2;

				depth = Math.max(depth, ((_current2 = current) == null ? void 0 : _current2.d) || 0) + 1;

				if (type === 'ordered_list') {
					payload.start = token.order;
				}
			}

			const item = {
				t: type,
				d: depth,
				p: payload,
				v: '',
				c: [],
			};
			current.c.push(item);
			stack.push(item);
		} else if (!current) {
			continue;
		} else if (token.type === `${current.t}_close`) {
			if (current.t === 'heading') {
				depth = current.d;
			} else {
				stack.pop();
				depth = 0;
			}
		} else if (token.type === 'inline') {
			current.v = `${current.v || ''}${extractInline(token)}`;
		}
	}

	return root;
}
function transform(content) {
	let _root$c;

	const tokens = md.parse(content || '', {});
	let root = buildTree(tokens);
	cleanNode(root);
	if (((_root$c = root.c) == null ? void 0 : _root$c.length) === 1) root = root.c[0];
	return root;
}

exports.buildTree = buildTree;
exports.transform = transform;
