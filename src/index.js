import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import chooseFormat from './formatters/index.js';
import parse from './parse.js';

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
const getDiff = (objContentFileOne, objContentFileTwo) => {
  const tempObjWithUniqKeys = { ...objContentFileOne, ...objContentFileTwo };
  const keysUniqNoSorted = Object.keys(tempObjWithUniqKeys);
  const keysUniq = _.sortBy(keysUniqNoSorted);
  const treeDifference = keysUniq.map((key) => {
    if (Object.hasOwn(objContentFileOne, key) && !Object.hasOwn(objContentFileTwo, key)) {
      return {
        name: key,
        type: 'addedObjOne',
        value: objContentFileOne[key],
      };
    }
    if (Object.hasOwn(objContentFileTwo, key) && !Object.hasOwn(objContentFileOne, key)) {
      return {
        name: key,
        type: 'addedObjTwo',
        value: objContentFileTwo[key],
      };
    }
    if (objContentFileOne[key] instanceof Object && objContentFileTwo[key] instanceof Object) {
      return {
        name: key,
        type: 'identicalKeyWithValObject',
        children: getDiff(objContentFileOne[key], objContentFileTwo[key]),
      };
    }
    if (objContentFileOne[key] === objContentFileTwo[key]) {
      return {
        name: key,
        type: 'identicalKeyValStaySame',
        value: objContentFileOne[key],
      };
    }

    return {
      name: key,
      type: 'identicalKeyValDifferent',
      valueObjOne: objContentFileOne[key],
      valueObjTwo: objContentFileTwo[key],
    };
  });
  return treeDifference;
};

export default (filepathOriginalOne, filepathOriginalTwo, format = 'stylish') => {
  const [objContFileOne, objContFileTwo] = getContentFile(filepathOriginalOne, filepathOriginalTwo);

  const treeDiff = getDiff(objContFileOne, objContFileTwo);
  const resFormatDiff = chooseFormat(treeDiff, format);
  return resFormatDiff;
};
