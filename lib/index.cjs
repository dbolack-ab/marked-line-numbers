'use strict';

function index(additionalTokens = null) {
  const rendererReturn = {};

  const whichTokens = additionalTokens ?? ['paragraph', 'image', 'blockquote', 'code', 'codespan', 'heading', 'html', 'list'];
  // Default list probably needs to grow.

  whichTokens.forEach((tokenType) => {
    rendererReturn[tokenType] = function(...args) { return addLocation(this, tokenType, ...args); };
  });

  return {
    renderer: rendererReturn
  };
}

function addLocation(renderer, name, ...args) {
  if (args[0].loop) return false;
  if (Object(args[0]).hasOwnProperty('injectedTags')) {
    return false;
  }
  let html;
  args[0].loop = true;
  try {
    html = renderer?.parser?.parse(args);
  } catch {
    try {
      html = renderer?.parser?.parseInline(args);
    } catch {}
  }

  // Be a little paranoid
  for (let arg in args) {
    if ((typeof args[arg] === 'object')
      && (Object(args[arg]).hasOwnProperty('type')) && (Object(args[arg]).hasOwnProperty('raw')) && (Object(args[arg]).hasOwnProperty('text'))) {
      if (args[0]?.position?.start?.line) {
        const endOfTag = html.indexOf('>');
        return html.slice(0, endOfTag) + ` data-lineNumber="${args[0].position.start.line}"` + html.slice(endOfTag);
      }
    }
  }
  return html;
}

module.exports = index;
