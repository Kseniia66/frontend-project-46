import yaml from 'js-yaml';

export default (contentFile, formatFile) => {
  switch (formatFile) {
    case 'json':
      return JSON.parse(contentFile);
    case 'yml' || 'yaml':
      return yaml.load(contentFile);
    default:
      throw new Error(`Error! This format - ${formatFile} - is not provided. Exist (json, yml, yaml)`);
  }
};
