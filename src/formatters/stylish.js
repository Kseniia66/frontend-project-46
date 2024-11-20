const getIndent = (depth, displacement = 2) => {
  const basicQuantityIndent = 4;
  const quantityIndent = (depth * basicQuantityIndent) - displacement;
  return quantityIndent;
};
const getCorrectValue = (value, indent, depth) => {
  if (value instanceof Object) {
    const entries = Object.entries(value);
    const newKeyValue = entries.map((keyValue) => {
      const newAcc = `\n${indent.repeat(getIndent(depth, 0))}${keyValue[0]}: ${getCorrectValue(keyValue[1], indent, depth + 1)}`;
      return newAcc;
    }).join('');
    return `{${newKeyValue}\n${indent.repeat(getIndent(depth - 1, 0))}}`;
  }
  return value;
};
const getFormatStylish = (treeDiff, depth = 1) => {
  const indent = ' ';
  const formatStylish = treeDiff.flatMap((key) => {
    if (key.type === 'deleted') {
      return `${indent.repeat(getIndent(depth))}- ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }
    if (key.type === 'added') {
      return `${indent.repeat(getIndent(depth))}+ ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }
    if (key.type === 'nested') {
      return `${indent.repeat(getIndent(depth))}  ${key.name}: ${getFormatStylish(key.children, depth + 1)}`;
    }
    if (key.type === 'unchanged') {
      return `${indent.repeat(getIndent(depth))}  ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }

    const dataObj = [
      `${indent.repeat(getIndent(depth))}- ${key.name}: ${getCorrectValue(key.value1, indent, depth + 1)}`,
      `${indent.repeat(getIndent(depth))}+ ${key.name}: ${getCorrectValue(key.value2, indent, depth + 1)}`];
    return dataObj;
  }).join('\n');
  return `{\n${formatStylish}\n${indent.repeat(getIndent(depth - 1, 0))}}`;
};
export default getFormatStylish;
