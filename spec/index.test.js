import { marked } from 'marked';
import MarkedLineNumbers from '../src/index.js';
import { addTokenPositions } from 'marked-token-position';

function trimLines(s) {
  return s.split('\n').map(l => l.trim()).join('\n');
}

describe('Line Numbers', () => {
  test('Paragraph', function() {
    marked.use(MarkedLineNumbers());
    const rawBrewText = trimLines('\nI\'m a paragraph\n');
    const tokens = marked.lexer(rawBrewText, {});
    addTokenPositions(tokens);
    const html = marked.parser(tokens, {});
    expect(marked(html)).toMatchSnapshot();
  });
});
