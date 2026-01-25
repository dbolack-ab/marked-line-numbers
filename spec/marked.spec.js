import { runAllMarkedSpecTests } from '@markedjs/testutils';
import MarkedLineNumbers from '../src/index.js';

runAllMarkedSpecTests({ addExtension: (marked) => { marked.use({ extensions: [MarkedLineNumbers] }); }, outputCompletionTables: true });
