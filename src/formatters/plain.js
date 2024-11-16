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
  const formatPlain = treeDiff.flatMap((key) => {
    if (key.type === 'deleted') {
      return `Property '${ancestry}${key.name}' was removed`;
    }
    if (key.type === 'added') {
      return `Property '${ancestry}${key.name}' was added with value: ${getType(key.value)}`;
    }
    if (key.type === 'nested') {
      return `${getFormatPlain(key.children, depth + 1, `${ancestry}${key.name}.`)}`;
    }
    if (key.type === 'changed') {
      return `Property '${ancestry}${key.name}' was updated. From ${getType(key.value1)} to ${getType(key.value2)}`;
    }
    return [];
  }).join('\n');
  return formatPlain;
};
export default getFormatPlain;
