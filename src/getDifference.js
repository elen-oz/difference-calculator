import _ from 'lodash';

const getDifference = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'object', children: getDifference(value1, value2) };
    }
    if (_.isEqual(value1, value2)) {
      return {
        key,
        type: 'unchanged',
        val: value1,
      };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', val: value2 };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', val: value1 };
    }
    return {
      key,
      type: 'changed',
      val1: value1,
      val2: value2,
    };
  });
};

export default getDifference;
