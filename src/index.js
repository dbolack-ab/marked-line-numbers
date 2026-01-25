export default function() {
  // extension code here

  return {
    parser: {
      header(...args) {
        console.log('Parser Header Start');
        console.log(args);
        console.log('Parser Header Ends');
      }
    },
    renderer: {
      paragraph(...args) {
        return addLocation(this, 'paragraph', ...args);
      },
      // image(...args) {
      //   return addLocation(this, 'image', ...args);
      // },
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
      },
      table(...args) {
        return addLocation(this, 'table', ...args);
      }

    }
  };
}

function addLocation(renderer, name, ...args) {
  if (args[0].loop) return false;
  let html = renderer.constructor.prototype[name].call(renderer, ...args);
  console.log(args[0]);
  args[0].loop = true;
  try {
    html = renderer?.parser?.parse(args);
  } catch (e) {
    // html = renderer?.parser?.parseInline(args);
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
