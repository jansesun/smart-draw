import expect from 'expect';
import util from '../../lib/util';

describe('className', () => {
  it('keeps object keys with truthy values', () => {
    expect(util.className({
      a: true,
      b: false,
      c: 0,
      d: null,
      e: undefined,
      f: 1
    })).toBe('a f');
  });
  it('supports heterogenous arguments', () => {
    expect(util.className([{ a: true }, 'b', 0])).toBe('a b');
  });
  it('returns an empty string for an empty configuration', () => {
    expect(util.className({})).toBe('');
  });
  it('supports an array of class names', () => {
    expect(util.className(['1', '2'])).toBe('1 2');
  });
  it('handles arrays that include objects', () => {
    expect(util.className(['a', { b: true, c: false }])).toBe('a b');
  });
});
describe('formatDate', () => {
  it('should generate correct year format', () => {
    expect(util.formatDate(1456391570000, 'yyyyMMdd', {
      year: '2-digit',
      month: '2-digit'
    })).toBe('160225');
  });
  it('should generate correct month format', () => {
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn', {
      month: 'short'
    })).toBe('Feb 25, 2016 | 5:12 pm');
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn', {
      month: 'long'
    })).toBe('February 25, 2016 | 5:12 pm');
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn', {
      month: '2-digit'
    })).toBe('02 25, 2016 | 5:12 pm');
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn', {
    })).toBe('2 25, 2016 | 5:12 pm');
  });
  it('should generate correct date format', () => {
    expect(util.formatDate(1456391570000, 'MM dd, yyyy | hh:mm nn')).toBe('2 25, 2016 | 5:12 pm');
  });
  it('should generate correct other format', () => {
    expect(util.formatDate(1456391570000, 'yyyy-MM-dd hh:mm:ss')).toBe('2016-2-25 17:12:50');
  });
});