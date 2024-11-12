const getType = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};
const getFormatPlain = (treeDiff, depth = 0, ancestry = '') => {
  const formatPlain = treeDiff.reduce((acc, key) => {
    if (key.type === 'deleted') {
      return `${acc}\nProperty '${ancestry}${key.name}' was removed`;
    }
    if (key.type === 'added') {
      return `${acc}\nProperty '${ancestry}${key.name}' was added with value: ${getType(key.value)}`;
    }
    if (key.type === 'nested') {
      return `${acc}${getFormatPlain(key.children, depth + 1, `${ancestry}${key.name}.`)}`;
    }
    if (key.type === 'changed') {
      return `${acc}\nProperty '${ancestry}${key.name}' was updated. From ${getType(key.value1)} to ${getType(key.value2)}`;
    }
    return acc;
  }, '');
  return formatPlain;
};
export default getFormatPlain;
