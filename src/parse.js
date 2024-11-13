import yaml from 'js-yaml';

export default (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Error! This format - ${format} - is not provided. Exist (json, yml, yaml)`);
  }
};
