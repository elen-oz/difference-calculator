import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

export default (data) => {
  const iter = (node, key = '') => {
    const result = node.flatMap((item) => {
      const newKeys = [...key, item.key];

      switch (item.type) {
        case 'object':
          return iter(item.children, newKeys);
        case 'added':
          return `Property '${newKeys.join('.')}' was added with value: ${stringify(item.val)}`;
        case 'deleted':
          return `Property '${newKeys.join('.')}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${newKeys.join('.')}' was updated. From ${stringify(item.val1)} to ${stringify(item.val2)}`;
        default:
          return `Unknown type ${item.type}`;
      }
    });

    return result.filter((item) => item !== null).join('\n');
  };
  return iter(data, []);
};
