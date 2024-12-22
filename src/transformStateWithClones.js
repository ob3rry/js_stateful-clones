'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const results = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addData(currentState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        clear(currentState);
        break;
    }

    const newRecord = { ...currentState };

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
