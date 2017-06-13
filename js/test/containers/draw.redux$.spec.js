import expect from 'expect';
import { playerActions, playerReducer$, indexActions, indexReducer$ } from '../../containers/draw.redux$';
describe('playerRedux$', () => {
  it('handles updateField', () => {
    playerReducer$.takeLast(3).toArray().subscribe((fns) => {
      expect(fns.reduce((acc, fn) => fn(acc), {})).toEqual({
        name: 'Janse Sun',
        gender: 1,
        seedIndex: 1
      });
    });
    playerActions.updateField$.next({
      field: 'name',
      value: 'Janse Sun'
    });
    playerActions.updateField$.next({
      field: 'gender',
      value: 1
    });
    playerActions.updateField$.next({
      field: 'seedIndex',
      value: 1
    });
  });
  it('handles reset', () => {
    playerReducer$.takeLast(2).toArray().subscribe((fns) => {
      expect(fns.reduce((acc, fn) => fn(acc), {})).toEqual({
        name: '',
        gender: 1,
        seedIndex: ''
      });
    });
    playerActions.updateField$.next({
      field: 'name',
      value: 'Janse Sun'
    });
    playerActions.reset$.next();
  });
});
describe('indexReducer$', () => {
  it('handles add and remove', () => {
    indexReducer$.take(5).toArray().subscribe((fns) => {
      expect(fns.reduce((acc, fn) => fn(acc), {})).toEqual({
        drawResult: [],
        playerList: [
          {
            name: 'Gong Hang',
            gender: 1,
            seedIndex: 1
          },
          {
            name: 'Sun Jian',
            gender: 1
          }
        ]
      });
    });
    indexActions.add$.next({
      name: 'Gong Hang',
      gender: 1,
      seedIndex: 1
    });
    indexActions.add$.next({
      name: 'Li Lintao',
      gender: 1,
      seedIndex: 2
    });
    indexActions.add$.next({
      name: 'Sun Jian',
      gender: 1
    });
    indexActions.remove$.next(1);
  });
  it('handles draw', () => {
    indexReducer$.take(2).toArray().subscribe((fns) => {
      expect(fns.reduce((acc, fn) => fn(acc), {})).toEqual({
        drawResult: [
          [
            {
              name: 'Gong Hang',
              gender: 1,
              seedIndex: 1
            },
            {
              name: 'Sun Jian',
              gender: 1
            }
          ]
        ],
        playerList: []
      });
    });
    indexActions.draw$.next([
      [
        {
          name: 'Gong Hang',
          gender: 1,
          seedIndex: 1
        },
        {
          name: 'Sun Jian',
          gender: 1
        }
      ]
    ]);
  });
});