import _ from 'lodash';

const space = (depth, countSpace = 4) => ' '.repeat(depth * countSpace);
const indent = ' '.repeat(2);
const getFormatStr = (tree, depth = 0) => {
  if (_.isPlainObject(tree)) {
    const keys = Object.keys(tree);
    const result = keys.map((key) => `${space(depth)}${key}: ${getFormatStr(tree[key], depth + 1)}`);
    return `{\n${result.join('\n')}\n${space(depth - 1)}}`;
  }
  return tree;
};

const getStylish = (tree) => {
  const iter = (node, depth = 1) => {
    const result = node.flatMap((item) => {
      if (item.type === 'nested') {
        return `${space(depth - 1)}${indent}  ${item.key}: ${iter(item.children, depth + 1)}`;
      }
      if (item.type === 'added') {
        return `${space(depth - 1)}${indent}+ ${item.key}: ${getFormatStr(item.value, depth + 1)}`;
      }
      if (item.type === 'deleted') {
        return `${space(depth - 1)}${indent}- ${item.key}: ${getFormatStr(item.value, depth + 1)}`;
      }
      if (item.type === 'changed') {
        return [
          `${space(depth - 1)}${indent}- ${item.key}: ${getFormatStr(item.value1, depth + 1)}`,
          `${space(depth - 1)}${indent}+ ${item.key}: ${getFormatStr(item.value2, depth + 1)}`];
      }
      if (item.type === 'unchanged') {
        return `${space(depth - 1)}${indent}  ${item.key}: ${getFormatStr(item.value1, depth + 1)}`;
      }
      return 'Unknown format';
    });
    return `{\n${result.join('\n')}\n${space(depth - 1)}}`;
  };
  return iter(tree);
};
export default getStylish;