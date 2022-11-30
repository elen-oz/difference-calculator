// const indent = (depth, spacesCount = 2) => {
//   const space = '  ';
//   return space.repeat(spacesCount * depth);
// };

const indent = (depth, spacesCount = 2) => '  '.repeat(spacesCount * depth);

const signIndent = (depth, spacesCount = 2) => '  '.repeat(spacesCount * depth).slice(2);

const stringify = (value, treeDepth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const arrayValue = Object.entries(value);
  const lines = arrayValue.map(
    ([key, val]) => `${indent(treeDepth + 1)}${key}: ${stringify(val, treeDepth + 1)}`,
  );

  return ['{', ...lines, `${indent(treeDepth)}}`].join('\n');
};

export default (innerTree) => {
  const signes = {
    add: '+',
    deduct: '-',
    emptySpace: ' ',
  };

  const iter = (tree, depth) => tree.map((item) => {
    const typeDiff = item.type;

    const getValue = (valuee, sign) => `${signIndent(depth)}${sign} ${item.key}: ${stringify(
      valuee,
      depth,
    )}\n`;
    switch (typeDiff) {
      case 'object':
        return `${indent(depth)}${item.key}: {\n${iter(
          item.children,
          depth + 1,
        ).join('')}${indent(depth)}}\n`;
      case 'added':
        return getValue(item.val, signes.add);
      case 'deleted':
        return getValue(item.val, signes.deduct);
      case 'unchanged':
        return getValue(item.val, signes.emptySpace);
      case 'changed':
        return `${getValue(item.val1, signes.deduct)}${getValue(
          item.val2,
          signes.add,
        )}`;
      default:
        return `Error: Unknown type: ${item.type}`;
    }
  });

  return `{\n${iter(innerTree, 1).join('')}}`;
};
