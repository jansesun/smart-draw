import expect from 'expect';
import enzymify from 'expect-enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import { Draw } from '../../containers/Draw';
import PlayerCell from '../../components/PlayerCell';

expect.extend(enzymify());
const playerList = [
  {
    name: '龚航',
    seedIndex: 1,
    gender: 1
  },
  {
    name: '马冉',
    gender: 1
  },
  {
    name: '程紫光',
    gender: 1
  },
  {
    name: '徐凡',
    gender: 1
  },
  {
    name: '周清华',
    gender: 1
  },
  {
    name: '王向阳',
    gender: 1
  },
  {
    name: '曾超宇',
    gender: 1
  },
  {
    name: '何志鹏',
    gender: 1
  },
  {
    name: '杨凯',
    gender: 1
  },
  {
    name: '郭柄男',
    gender: 0
  },
  {
    name: '王迪',
    gender: 1
  },
  {
    name: '渠慧帆',
    gender: 1
  },
  {
    name: '杨帆',
    gender: 1
  },
  {
    name: '李林涛',
    gender: 1
  },
  {
    name: '付瑶',
    gender: 0
  },
  {
    name: '胡盛昌',
    gender: 1
  },
  {
    name: '高鹏',
    gender: 1
  },
  {
    name: '赵强',
    gender: 1
  },
  {
    name: '葛江华',
    gender: 1
  },
  {
    name: '余俊杰',
    gender: 1
  },
  {
    name: '吕兢',
    gender: 1
  },
  {
    name: '常龙',
    gender: 1
  },
  {
    name: '孙健',
    gender: 1
  },
  {
    name: '彭曲',
    gender: 1
  },
  {
    name: '汪鹭',
    gender: 0
  }
];
const drawResult = [
  [
    {
      name: '彭曲',
      gender: 1
    },
    {
      name: '汪鹭',
      gender: 0
    }
  ]
];
describe('Draw', () => {
  it('should only display form when playerList and drawResult is empty array', () => {
    const tree = shallow(
      <Draw
        name=""
        gender={1}
        seedIndex=""
        playerList={[]}
        drawResult={[]}
        updateField={expect.createSpy()}
        add={expect.createSpy()}
        reset={expect.createSpy()}
        remove={expect.createSpy()}
        draw={expect.createSpy()}
      />
    );
    expect(tree.children().length).toBe(2);
  });
  it('should display playerList when playerList has elements', () => {
    const tree = shallow(
      <Draw
        name=""
        gender={1}
        seedIndex=""
        playerList={playerList}
        drawResult={[]}
        updateField={expect.createSpy()}
        add={expect.createSpy()}
        reset={expect.createSpy()}
        remove={expect.createSpy()}
        draw={expect.createSpy()}
      />
    );
    expect(tree.find('.panel-heading').last().text()).toBe('Player List');
    const lastTableBody = tree.find('tbody').last();
    expect(lastTableBody.children().length).toBe(playerList.length);
    const row = lastTableBody.find('tr');
    expect(row.children().first()).toBeA(PlayerCell);
    expect(row.children().last().text()).toBe('Remove');
  });
  it('should display drawResult when drawResult has elements', () => {
    const tree = shallow(
      <Draw
        name=""
        gender={1}
        seedIndex=""
        playerList={playerList}
        drawResult={drawResult}
        updateField={expect.createSpy()}
        add={expect.createSpy()}
        reset={expect.createSpy()}
        remove={expect.createSpy()}
        draw={expect.createSpy()}
      />
    );
    expect(tree.find('.panel-heading').at(1).text()).toBe('Brackets');
    const firstTableBody = tree.find('tbody').first();
    expect(firstTableBody.children().length).toBe(drawResult.length);
    const row = firstTableBody.find('tr');
    expect(row.children().length).toBe(3);
    expect(row.children().first()).toBeA(PlayerCell);
    expect(row.children().at(1).text()).toBe('VS');
    expect(row.children().last()).toBeA(PlayerCell);
  });
  it('should call passed action', () => {
    const updateField = expect.createSpy();
    const add = expect.createSpy();
    const reset = expect.createSpy();
    const remove = expect.createSpy();
    const draw = expect.createSpy();

    const tree = shallow(
      <Draw
        name="Sun Jian"
        gender={1}
        seedIndex=""
        playerList={playerList}
        drawResult={drawResult}
        updateField={updateField}
        add={add}
        reset={reset}
        remove={remove}
        draw={draw}
      />
    );
    const nameInput = tree.find('#name');
    const seedIndexInput = tree.find('#seedIndex');
    const genderCheckBox = tree.find('[type="checkbox"]');
    const addBtn = tree.find('.btn-primary');
    const drawBtn = tree.find('.btn-success');
    const removeBtns = tree.find('.btn-danger');

    nameInput.simulate('change', {
      target: {
        value: 'Janse'
      }
    });
    expect(updateField).toHaveBeenCalledWith('name', 'Janse');
    seedIndexInput.simulate('change', {
      target: {
        value: '1'
      }
    });
    expect(updateField).toHaveBeenCalledWith('seedIndex', '1');
    genderCheckBox.simulate('change', {
      target: {
        checked: true
      }
    });
    expect(updateField).toHaveBeenCalledWith('gender', 0);

    addBtn.simulate('click');
    expect(add).toNotHaveBeenCalled();

    drawBtn.simulate('click');
    expect(draw).toNotHaveBeenCalled();

    removeBtns.at(2).simulate('click');
    expect(remove).toNotHaveBeenCalled();

  });
  it('should call add, draw and remove actions when drawResult is empty', () => {
    const updateField = expect.createSpy();
    const add = expect.createSpy();
    const reset = expect.createSpy();
    const remove = expect.createSpy();
    const draw = expect.createSpy();

    const tree = shallow(
      <Draw
        name="Sun Jian"
        gender={1}
        seedIndex=""
        playerList={playerList}
        drawResult={[]}
        updateField={updateField}
        add={add}
        reset={reset}
        remove={remove}
        draw={draw}
      />
    );

    const addBtn = tree.find('.btn-primary');
    addBtn.simulate('click');
    expect(add).toHaveBeenCalledWith({
      name: 'Sun Jian',
      gender: 1
    });
    expect(reset).toHaveBeenCalled();

    const drawBtn = tree.find('.btn-success');
    drawBtn.simulate('click');
    expect(draw).toHaveBeenCalled();

    const removeBtns = tree.find('.btn-danger');
    removeBtns.at(2).simulate('click');
    expect(remove).toHaveBeenCalledWith(2);
  });
});