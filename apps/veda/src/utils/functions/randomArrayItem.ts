import { includes } from 'ramda';

const randomArrayItem = <T extends any>(value: T[]) => {
  const result: T[] = [];
  while (result.length < value.length) {
    const newArr = value.filter(item => !includes(item, result));
    const newItem = newArr[Math.floor(Math.random() * newArr.length)];
    if (!result.includes(newItem)) {
      result.push(newItem);
    }
  }
  return result;
};

export default randomArrayItem;
