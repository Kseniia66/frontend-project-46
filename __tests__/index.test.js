import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const pathFileJsonOne = getFixturePath('file1.json');
const pathFileYmlTwo = getFixturePath('file2.yml');

const formatters = ['stylish', 'plain', 'json', undefined];

test.each(formatters)('generate difference: %s', (formatter) => {
  const effectiveFormatter = formatter === undefined ? 'stylish' : formatter;
  const pathFileResult = getFixturePath(`${effectiveFormatter}Result.txt`);
  const contentFileResult = readFileSync(pathFileResult, 'utf-8');

  expect(genDiff(pathFileJsonOne, pathFileYmlTwo, formatter)).toBe(contentFileResult);
});
