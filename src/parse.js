import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yml: yaml.load,
};

export default (data, format) => parsers[format](data);
