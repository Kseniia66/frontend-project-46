const getQuantityIndent = (depth, displacement = 2) => {
  const basicQuantityIndent = 4;
  const quantityIndent = (depth * basicQuantityIndent) - displacement;
  return quantityIndent;
};
const getCorrectValue = (value, indent, depth) => {
  if (value instanceof Object) {
    const entries = Object.entries(value);
    const newKeyValue = entries.reduce((acc, keyValue) => {
      const newAcc = `${acc}\n${indent.repeat(getQuantityIndent(depth, 0))}${keyValue[0]}: ${getCorrectValue(keyValue[1], indent, depth + 1)}`;
      return newAcc;
    }, '');
    return `{${newKeyValue}\n${indent.repeat(getQuantityIndent(depth - 1, 0))}}`;
  }
  return value;
};
const getFormatStylish = (treeDiff, depth = 1) => {
  const indent = ' ';
  const formatStylish = treeDiff.reduce((acc, key) => {
    if (key.type === 'deleted') {
      return `${acc}\n${indent.repeat(getQuantityIndent(depth))}- ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }
    if (key.type === 'added') {
      return `${acc}\n${indent.repeat(getQuantityIndent(depth))}+ ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }
    if (key.type === 'nested') {
      return `${acc}\n${indent.repeat(getQuantityIndent(depth))}  ${key.name}: ${getFormatStylish(key.children, depth + 1)}`;
    }
    if (key.type === 'unchanged') {
      return `${acc}\n${indent.repeat(getQuantityIndent(depth))}  ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }

    const dataObjOne = `${indent.repeat(getQuantityIndent(depth))}- ${key.name}: ${getCorrectValue(key.value1, indent, depth + 1)}`;
    const dataObjTwo = `${indent.repeat(getQuantityIndent(depth))}+ ${key.name}: ${getCorrectValue(key.value2, indent, depth + 1)}`;
    return `${acc}\n${dataObjOne}\n${dataObjTwo}`;
  }, '');
  return `{${formatStylish}\n${indent.repeat(getQuantityIndent(depth - 1, 0))}}`;
};
export default getFormatStylish;
