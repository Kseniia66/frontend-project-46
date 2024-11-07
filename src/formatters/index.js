import getStylish from './stylish.js';
import getPlain from './plain.js';

const formater = {
  json: JSON.stringify,
  stylish: getStylish,
  plain: getPlain,
};
const format = (tree, style) => {
  try {
    return formater[style](tree);
  } catch (err) {
    return 'Unknow format';
  }
};

export default format;


const chooseFormat = (treeDiff, format) => { // вывод результата по переданному формату
  switch (format) {
    case 'stylish':
      return getFormatStylish(treeDiff);
    case 'plain':
      return getFormatPlain(treeDiff).slice(1);
    case 'json':
      return JSON.stringify(treeDiff, null, 2);
    default:
      throw new Error('Error in chooseFormat (stylish, plain, json)');
  }
};