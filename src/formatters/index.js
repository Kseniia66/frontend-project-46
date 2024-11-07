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