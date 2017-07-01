import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-react-rxjs';
import { indexActions, playerActions } from './draw.redux$';
import { AllowUndefined } from '../util/enhancePropTypes';
import PlayerCell from '../components/PlayerCell';
import util from '../lib/util';
import drawList from '../util/draw';
const isPositiveNum = function(val) {
  return typeof val === 'number' && val > 0;
};
export class Draw extends Component {
  constructor(props) {
    super(props);
    util.bindMethods(['add', 'draw', 'updateFiled', 'remove'], this);
  }
  add() {
    const { name, gender, seedIndex, add, reset, drawResult } = this.props;
    if(drawResult.length) {
      alert('The draw result has been generated!');
      return;
    }
    if(!name) {
      alert('Please input player\'s name');
      return;
    }
    if(this.nameSet.has(name)) {
      alert('This player\'s name has been occupied');
      return;
    }
    const player = {
      name,
      gender
    };
    if(seedIndex && (+seedIndex + '' === seedIndex)) {
      const _seedIndex = +seedIndex;
      if(this.seedNameMap.has(_seedIndex)) {
        alert(`${this.seedNameMap.get(_seedIndex)} is No. ${_seedIndex} seed player now.`);
        return;
      }
      this.seedNameMap.set(_seedIndex, name);
      player.seedIndex = _seedIndex;
    }
    this.nameSet.add(name);
    reset();
    add(player);
  }
  remove(index) {
    const { remove, drawResult, playerList } = this.props;
    if(drawResult.length) {
      alert('The draw result has been generated!');
      return;
    }
    if(confirm('Will you remove this player?')) {
      this.nameSet.delete(playerList[index].name);
      this.seedNameMap.delete(playerList[index].seedIndex);
      remove(index);
    }
  }
  draw() {
    const { playerList, draw, drawResult } = this.props;
    if(drawResult.length) {
      alert('The draw result has been generated!');
      return;
    }
    if(confirm('Will you draw right now?')) {
      draw(drawList(playerList));
    }
  }
  updateSeedIndex(value) {
    if(value.match(/^(?:[1-9]\d*)?$/)) {
      this.updateField('seedIndex', value);
    }
  }
  updateField(field, value) {
    const { updateField } = this.props;
    updateField(field, value);
  }
  componentWillMount() {
    const { playerList } = this.props;
    this.nameSet = new Set(playerList.map(player => player.name));
    this.seedNameMap = new Map(
        playerList.filter(player => player.seedIndex)
          .map(player => [player.seedIndex, player.name])
    );
  }
  render() {
    const { name, gender, seedIndex, drawResult, playerList, updateFiled, add, draw } = this.props;
    const totalNum = playerList.length;
    const girlNum = playerList.filter(player => player.gender === 0).length;
    return (
      <div style={{
        margin: '15px'
      }}>
        <div className="panel panel-default">
          <div className="panel-heading">Join Form</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    this.updateField('name', e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="seedIndex">Seed Index</label>
                <input
                  type="text"
                  className="form-control"
                  id="seedIndex"
                  placeholder="Seed Index"
                  value={seedIndex}
                  onChange={(e) => {
                    this.updateSeedIndex(e.target.value.trim());
                  }}
                />
              </div>
              <div className="checkbox">
                <label><input type="checkbox" checked={!gender} onChange={(e) => {
                  this.updateField('gender', e.target.checked ? 0 : 1);
                }} /> Girl</label>
              </div>
              <div className="btn btn-primary" onClick={this.add}>Add</div>
            </div>
          </div>
        </div>
        <div className="btn btn-success btn-block" style={{
          marginBottom: '20px'
        }} onClick={this.draw}>Draw</div>
        {!!drawResult.length &&
          <div className="panel panel-default">
            <div className="panel-heading">Brackets</div>
            <table className="table table-bordered">
              <tbody>
                {drawResult.map((result, index)=>
                  <tr key={index}>
                    <PlayerCell player={result[0]}/>
                    <td className="text-center">VS</td>
                    <PlayerCell player={result[1]}/>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
        {!!playerList.length &&
          <div className="panel panel-default">
            <div className="panel-heading text-bold">Player List</div>
            <div className="panel-body">
              <div className="progress" style={{
                marginBottom: 0
              }}>
                {!!girlNum &&
                  <div className="progress-bar progress-bar-danger" style={{
                    width: `${girlNum / totalNum * 100}%`
                  }}>{girlNum}</div>
                }
                <div className="progress-bar progress-bar-info" style={{
                    width: `${100 - girlNum / totalNum * 100}%`
                }}>{totalNum - girlNum}</div>
              </div>
            </div>
            <table className="table table-bordered table-condensed">
              <tbody>
                {playerList.map((player, index) =>
                  <tr key={player.name}>
                    <PlayerCell player={player}/>
                    <td className="text-center">
                      <div className="btn btn-danger btn-xs" onClick={this.remove.bind(this, index)}>Remove</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}
Draw.propTypes = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.oneOf([0, 1]).isRequired,
  seedIndex: PropTypes.string.isRequired,
  drawResult: PropTypes.array.isRequired,
  playerList: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  draw: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};
export default connect(state => ({
  ...state.player,
  ...state.data,
  add(player) {
    indexActions.add$.next(player);
  },
  reset() {
    playerActions.reset$.next();
  },
  updateField(field, value) {
    playerActions.updateField$.next({
      field,
      value
    });
  },
  draw(drawResult) {
    indexActions.draw$.next(drawResult);
  },
  remove(index) {
    indexActions.remove$.next(index);
  }
}))(Draw);