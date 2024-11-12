import _ from 'lodash';

const getDiff = (data1, data2) => {
  const tempObjWithUniqKeys = { ...data1, ...data2 };
  const keysUniqNoSorted = Object.keys(tempObjWithUniqKeys);
  const keysUniq = _.sortBy(keysUniqNoSorted);
  const treeDifference = keysUniq.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: data1[key],
      };
    }
    if (!Object.hasOwn(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: data2[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key,
        type: 'nested',
        children: getDiff(data1[key], data2[key]),
      };
    }
    if (data1[key] === data2[key]) {
      return {
        name: key,
        type: 'unchanged',
        value: data1[key],
      };
    }
    return {
      name: key,
      type: 'changed',
      value1: data1[key],
      value2: data2[key],
    };
  });
  return treeDifference;
};
export default getDiff;
