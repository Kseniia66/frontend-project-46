import getFormatStylish from './stylish.js';
import getFormatPlain from './plain.js';

const format = (treeDiff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return getFormatStylish(treeDiff);
    case 'plain':
      return getFormatPlain(treeDiff);
    case 'json':
      return JSON.stringify(treeDiff, null, 2);
    default:
      throw new Error('Error in format (stylish, plain, json)');
  }
};
export default format;
