const getIndent = (depth, displacement = 2) => {
  const basicQuantityIndent = 4;
  const quantityIndent = (depth * basicQuantityIndent) - displacement;
  return ' '.repeat(Math.max(quantityIndent, 0));
};

const getCorrectValue = (value, indent, depth) => {
  if (value instanceof Object) {
    const entries = Object.entries(value);
    const newKeyValue = entries.map(([key, val]) => {
      const newAcc = `\n${getIndent(depth, 0)}${key}: ${getCorrectValue(val, indent, depth + 1)}`;
      return newAcc;
    }).join('');
    return `{${newKeyValue}\n${getIndent(depth - 1, 0)}}`;
  }
  return value;
};

const getFormatStylish = (treeDiff) => {
  const formatStylish = (currentTreeDiff, depth = 1) => {
    const indent = ' ';
    const formattedLines = currentTreeDiff.flatMap((key) => {
      if (key.type === 'deleted') {
        return `${getIndent(depth)}- ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
      }
      if (key.type === 'added') {
        return `${getIndent(depth)}+ ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
      }
      if (key.type === 'nested') {
        return `${getIndent(depth)}  ${key.name}: ${formatStylish(key.children, depth + 1)}`;
      }
      if (key.type === 'unchanged') {
        return `${getIndent(depth)}  ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
      }

      return [
        `${getIndent(depth)}- ${key.name}: ${getCorrectValue(key.value1, indent, depth + 1)}`,
        `${getIndent(depth)}+ ${key.name}: ${getCorrectValue(key.value2, indent, depth + 1)}`,
      ];
    }).join('\n');

    return `{\n${formattedLines}\n${getIndent(depth - 1, 0)}}`;
  };

  return formatStylish(treeDiff);
};

export default getFormatStylish;
