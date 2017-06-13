import expect from 'expect';
import { seedSort, generateBrackets } from '../../util/draw';

describe('seedSort', () => {
  it('should generate empty array when n is 0', () => {
    expect(seedSort(0)).toEqual([]);
  });
  it('should generate expected array when n is greater than 0', () => {
    expect(seedSort(1)).toEqual([1]);
    expect(seedSort(2)).toEqual([1, 2]);
    expect(seedSort(3)).toEqual([1, 4, 3, 2]);
    expect(seedSort(5)).toEqual([1, 8, 5, 4, 3, 6, 7, 2]);
  });
});
describe('generateBrackets', () => {
  it('should generate correctly brackects when defaultPlayer is primitive', () => {
    expect(generateBrackets([1, 2, 3, 4, 5, 6], 0)).toEqual([
      [1, 0],
      [5, 4],
      [3, 6],
      [0, 2]
    ]);
  });
  it('should generate correctly brackects when defaultPlayer is an object', () => {
    expect(generateBrackets([1, 2, 3, 4, 5, 6].map(o => ({
      name: '' + o
    })), {
      name: '0'
    })).toEqual([
      [{name: '1'}, {name: '0'}],
      [{name: '5'}, {name: '4'}],
      [{name: '3'}, {name: '6'}],
      [{name: '0'}, {name: '2'}]
    ]);
  });
});