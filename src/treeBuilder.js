import _ from 'lodash';

const getDiff = (objContentFileOne, objContentFileTwo) => {
  const tempObjWithUniqKeys = { ...objContentFileOne, ...objContentFileTwo };
  const keysUniqNoSorted = Object.keys(tempObjWithUniqKeys);
  const keysUniq = _.sortBy(keysUniqNoSorted);
  const treeDifference = keysUniq.map((key) => {
    if (Object.hasOwn(objContentFileOne, key) && !Object.hasOwn(objContentFileTwo, key)) {
      return {
        name: key,
        type: 'addedObjOne',
        value: objContentFileOne[key],
      };
    }
    if (Object.hasOwn(objContentFileTwo, key) && !Object.hasOwn(objContentFileOne, key)) {
      return {
        name: key,
        type: 'addedObjTwo',
        value: objContentFileTwo[key],
      };
    }
    if (objContentFileOne[key] instanceof Object && objContentFileTwo[key] instanceof Object) {
      return {
        name: key,
        type: 'identicalKeyWithValObject',
        children: getDiff(objContentFileOne[key], objContentFileTwo[key]),
      };
    }
    if (objContentFileOne[key] === objContentFileTwo[key]) {
      return {
        name: key,
        type: 'identicalKeyValStaySame',
        value: objContentFileOne[key],
      };
    }

    return {
      name: key,
      type: 'identicalKeyValDifferent',
      valueObjOne: objContentFileOne[key],
      valueObjTwo: objContentFileTwo[key],
    };
  });
  return treeDifference;
};
export default getDiff;
