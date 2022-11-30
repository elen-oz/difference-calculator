import yaml from 'js-yaml';

const parser = (fileContent, fileFormat) => {
  switch (fileFormat) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
      return yaml.load(fileContent);
    case 'yaml':
      return yaml.load(fileContent);
    default:
      return `This format is not supported: ${fileFormat}`;
  }
};

export default parser;
