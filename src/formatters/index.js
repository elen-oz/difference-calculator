import stylish from './stylish.js';
// import plain from './plain.js';

export default (data, format) => {
  // const result = stylish(data);
  // return result;
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      return `Error: This type does not exist: ${format}`;
  }
};
