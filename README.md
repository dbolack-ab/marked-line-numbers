# marked-line-numbers

Output a data-lineNumber attribute in the default elements. Requires marked-token-position;

# Usage
<!-- Show most examples of how to use this extension -->

```js
import { marked as Marked }     from 'marked';
import {addTokenPositions}      from 'marked-token-position';
import MarkedLineNumbers        from 'marked-line-numbers';

marked.use(MarkedLineNumbers());

const rawBrewtext = `\nI'm a paragraph!\n`;

const tokens = Marked.lexer(rawBrewText, opts);
addTokenPositions(tokens);

Marked.walkTokens(tokens, opts.walkTokens);

const html = Marked.parser(tokens);
console.log(html);
```

results:

`<p data-lineNumber="1">I'm a paragraph!</p>`
