const indent = (depth, spacesCount = 2) => {
  const space = '  ';
  return space.repeat(spacesCount * depth);
};

const signIndent = (depth, spacesCount = 2) => {
  const space = '  ';
  const tempSign = space.repeat(spacesCount * depth);
  const signSpace = tempSign.slice(2);

  return signSpace;
};

const stringify = (value, treeDepth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const arrayValue = Object.entries(value);
  const lines = arrayValue.map(
    ([key, val]) => `${indent(treeDepth + 1)}${key}: ${stringify(val, treeDepth + 1)}`,
  );
  const builTree = ['{', ...lines, `${indent(treeDepth)}}`].join('\n');

  return builTree;
};

export default (innerTree) => {
  const signes = {
    add: '+',
    deduct: '-',
    emptySpace: ' ',
  };

  const iter = (tree, depth) => tree.map((item) => {
    const typeDiff = item.type;

    const getValue = (valuee, sign) => `${signIndent(depth)}${sign} ${item.key}: ${stringify(valuee, depth)}\n`;
    switch (typeDiff) {
      case 'object':
        // eslint-disable-next-line max-len
        return `${indent(depth)}${item.key}: {\n${iter(item.children, depth + 1).join('')}${indent(depth)}}\n`;
      case 'added':
        return getValue(item.val, signes.add);
      case 'deleted':
        return getValue(item.val, signes.deduct);
      case 'unchanged':
        return getValue(item.val, signes.emptySpace);
      case 'changed':
        return `${getValue(item.val1, signes.deduct)}${getValue(item.val2, signes.add)}`;
      default:
        return `Error: Unknown type: ${item.type}`;
    }
  });

  return `{\n${iter(innerTree, 1).join('')}}`;
};
