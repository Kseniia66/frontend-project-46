import path from 'path';
import fs from 'fs';
import chooseFormat from './formatters/index.js';
import parse from './parse.js';
import getDiff from './treeBuilder.js';

const getContentFile = (filepath) => {
  const filepathResolve = path.resolve(process.cwd(), filepath);
  const contentFile = fs.readFileSync(filepathResolve, 'utf-8');
  const formatFile = path.extname(filepathResolve).slice(1);
  const objContentFile = parse(contentFile, formatFile);
  return objContentFile;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = getContentFile(filepath1);
  const data2 = getContentFile(filepath2);
  const treeDiff = getDiff(data1, data2);
  const resFormatDiff = chooseFormat(treeDiff, format);
  return resFormatDiff;
};
