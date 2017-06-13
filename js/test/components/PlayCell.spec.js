import expect from 'expect';
import enzymify from 'expect-enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import PlayerCell from '../../components/PlayerCell';

describe('PlayerCell', () => {
  it('should render seeded player correctly', () => {
    const player = {
      name: '龚航',
      gender: 1,
      seedIndex: 1
    };
    const tree = shallow(
      <PlayerCell player={player}/>
    );
    expect(tree.text()).toBe(`${player.name}(${player.seedIndex})`);
    expect(tree.hasClass('warning')).toExist();
  });
  it('should render unseeded female player correctly', () => {
    const player = {
      name: '王静怡',
      gender: 0
    };
    const tree = shallow(
      <PlayerCell player={player}/>
    );
    expect(tree.text()).toBe(`${player.name}`);
    expect(tree.hasClass('danger')).toExist();
  });
  it('should render unseeded male player correctly', () => {
    const player = {
      name: '孙健',
      gender: 1
    };
    const tree = shallow(
      <PlayerCell player={player}/>
    );
    expect(tree.text()).toBe(`${player.name}`);
    expect(tree.hasClass('info')).toExist();
  });
  it('should render bye correctly', () => {
    const player = {
      name: 'N/A',
      gender: 1
    };
    const tree = shallow(
      <PlayerCell player={player}/>
    );
    expect(tree.text()).toBe(`${player.name}`);
    expect(tree.hasClass('active')).toExist();
  });
});