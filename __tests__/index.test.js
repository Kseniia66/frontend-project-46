import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const pathFileJsonOne = getFixturePath('file1.json');
const pathFileYmlTwo = getFixturePath('file2.yml');

const genDiffResult = genDiff;

const formatters = ['stylish', 'plain', 'json']; 

test.each([
  [pathFileJsonOne, pathFileYmlTwo],
])('generate difference using different format', (a, b) => {
  formatters.forEach((formatter) => {
    const pathFileResult = getFixturePath(`result${formatter.charAt(0).toUpperCase() + formatter.slice(1)}`);
    const contentFileResult = readFileSync(pathFileResult, 'utf-8');
    expect(genDiffResult(a, b, formatter)).toBe(contentFileResult);
  });
});