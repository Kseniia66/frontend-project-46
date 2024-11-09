import path from 'path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import chooseFormat from './formatters/index.js';
import parse from './parse.js';
import getDiff from './treeBuilder.js';

const getContentFile = (filepathOriginalOne, filepathOriginalTwo) => {
  const pathCwd = cwd();
  const filepathResolveOne = path.resolve(pathCwd, filepathOriginalOne);
  const filepathResolveTwo = path.resolve(pathCwd, filepathOriginalTwo);
  const contentFileOne = readFileSync(filepathResolveOne, 'utf-8');
  const contentFileTwo = readFileSync(filepathResolveTwo, 'utf-8');
  const formatFileOne = path.extname(filepathResolveOne).slice(1);
  const formatFileTwo = path.extname(filepathResolveTwo).slice(1);
  const objContentFileOne = parse(contentFileOne, formatFileOne);
  const objContentFileTwo = parse(contentFileTwo, formatFileTwo);
  return [objContentFileOne, objContentFileTwo];
};

export default (filepathOriginalOne, filepathOriginalTwo, format = 'stylish') => {
  const [objContFileOne, objContFileTwo] = getContentFile(filepathOriginalOne, filepathOriginalTwo);

  const treeDiff = getDiff(objContFileOne, objContFileTwo);
  const resFormatDiff = chooseFormat(treeDiff, format);
  return resFormatDiff;
};
