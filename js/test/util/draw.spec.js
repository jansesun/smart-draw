import expect from 'expect';
import { seedSort } from '../../util/draw';

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