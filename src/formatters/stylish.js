const getIndent = (depth, displacement = 2) => {
  const basicQuantityIndent = 4;
  const quantityIndent = (depth * basicQuantityIndent) - displacement;
  return ' '.repeat(Math.max(quantityIndent, 0));
};
const getCorrectValue = (value, indent, depth) => {
  if (value instanceof Object) {
    const entries = Object.entries(value);
    const newKeyValue = entries.map((keyValue) => {
      const newAcc = `\n${getIndent(depth, 0)}${keyValue[0]}: ${getCorrectValue(keyValue[1], indent, depth + 1)}`;
      return newAcc;
    }).join('');
    return `{${newKeyValue}\n${getIndent(depth - 1, 0)}}`;
  }
  return value;
};
const getFormatStylish = (treeDiff, depth = 1) => {
  const indent = ' ';
  const formatStylish = treeDiff.flatMap((key) => {
    if (key.type === 'deleted') {
      return `${getIndent(depth)}- ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }
    if (key.type === 'added') {
      return `${getIndent(depth)}+ ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }
    if (key.type === 'nested') {
      return `${getIndent(depth)}  ${key.name}: ${getFormatStylish(key.children, depth + 1)}`;
    }
    if (key.type === 'unchanged') {
      return `${getIndent(depth)}  ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }

    const dataObj = [
      `${getIndent(depth)}- ${key.name}: ${getCorrectValue(key.value1, indent, depth + 1)}`,
      `${getIndent(depth)}+ ${key.name}: ${getCorrectValue(key.value2, indent, depth + 1)}`];
    return dataObj;
  }).join('\n');
  return `{\n${formatStylish}\n${getIndent(depth - 1, 0)}}`;
};
export default getFormatStylish;
