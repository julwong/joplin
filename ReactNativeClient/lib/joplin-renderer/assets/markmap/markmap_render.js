/* global mermaid */

var markmap = null;

function markmapReady() {
	if ( typeof d3 !== 'undefined' && typeof initMarkmap != 'undefined' ) {
        markmap = initMarkmap(d3);
        return true;
    }
    return markmap != null;
}

function markmapInit() {
	if (markmapReady()) {
        var svgEl = document.querySelector('#mindmap');
        var data = JSON.parse(decodeURI(svgEl.getAttribute('data-js')));
        markmap(svgEl, data, {
            processHtml: nodes => {
                if (window.MathJax.typeset) MathJax.typeset(nodes);
            },
        });
    }
}

document.addEventListener('joplin-noteDidUpdate', () => {
	markmapInit();
});

const initMMID_ = setInterval(() => {
	const isReady = markmapReady();
	if (isReady) {
		clearInterval(initMMID_);
		markmapInit();
	}
}, 100);
