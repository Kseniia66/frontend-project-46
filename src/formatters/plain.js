import _ from 'lodash';

const createStr = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

const getPlain = (tree) => {
  const iter = (node, path = '') => {
    const result = node.flatMap((item) => {
      const currentPath = `${path}${item.key}`;
      if (item.type === 'nested') {
        return iter(item.children, `${currentPath}.`);
      }
      if (item.type === 'added') {
        return `Property '${currentPath}' was added with value: ${createStr(item.value)}`;
      }
      if (item.type === 'deleted') {
        return `Property '${currentPath}' was removed`;
      }
      if (item.type === 'changed') {
        return `Property '${currentPath}' was updated. From ${createStr(item.value1)} to ${createStr(item.value2)}`;
      }
      if (item.type === 'unchanged') {
        return [];
      }
      return 'Unknown format';
    });
    return `${result.join('\n')}`;
  };
  return iter(tree);
};
export default getPlain;
