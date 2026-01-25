export default function(additionalTokens) {
  return {
    renderer: {
      paragraph(...args) {
        return addLocation(this, 'paragraph', ...args);
      },
      image(...args) {
        return addLocation(this, 'image', ...args);
      },
      blockquote(...args) {
        return addLocation(this, 'blockquote', ...args);
      },
      code(...args) {
        return addLocation(this, 'code', ...args);
      },
      codespan(...args) {
        return addLocation(this, 'codespan', ...args);
      },
      heading(...args) {
        return addLocation(this, 'heading', ...args);
      },
      html(...args) {
        return addLocation(this, 'html', ...args);
      },
      list(...args) {
        return addLocation(this, 'list', ...args);
      }
    }
  };
}

function addLocation(renderer, name, ...args) {
  if (name === 'table') console.log(args[0]);
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

  if (name === 'table') console.log(html);

  // Be a little paranoid
  for (let arg in args) {
    if ((typeof args[arg] === 'object')
      && (Object(args[arg]).hasOwnProperty('type')) && (Object(args[arg]).hasOwnProperty('raw')) && (Object(args[arg]).hasOwnProperty('text'))) {
      if (args[0]?.position?.start?.line) {
        const endOfTag = html.indexOf('>');
        if (args[arg].type == 'image') { console.log(html.slice(0, endOfTag) + ` data-lineNumber="${args[0].position.start.line}"` + html.slice(endOfTag)); }
        return html.slice(0, endOfTag) + ` data-lineNumber="${args[0].position.start.line}"` + html.slice(endOfTag);
      }
    }
  }
  return html;
}
