'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const results = [];

  for (const action of actions) {
    const newRecord = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        addData(newRecord, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(newRecord, action.keysToRemove);
        break;

      case 'clear':
        clear(newRecord);
        break;

      default:
        break;
    }

    currentState = newRecord;

    results.push(newRecord);
  }

  return results;
}

function addData(currentState, extraData) {
  Object.assign(currentState, extraData);
}

function removeProperties(currentState, extraData) {
  for (const key of extraData) {
    delete currentState[key];
  }
}

function clear(currentState) {
  for (const key in currentState) {
    delete currentState[key];
  }
}

module.exports = transformStateWithClones;
