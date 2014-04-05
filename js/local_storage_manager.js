


//fakestorage is a way to store things if localstorage isnt enabled
window.fakeStorage = {
//_data is an array of objects
  _data: {},

//sets the score of the object setItem was called on to the value
  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

//hasOwnProperty means whether or not this prototype has the value
//can be used for checking to make sure no prototypes without one of
//the properties specified in the assignment description can be added
//unless they have all the values
  getItem: function (id) {
    //if it has the property of ID then set the data to ID otherwise undefined
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";

  //if local storage is not available, supported will be 0/false
  var supported = this.localStorageSupported();
  //choose the correct storage option depending on localstorage capability
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";
  var storage = window.localStorage;

//test to see if it can store and remove from localstorage
  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};
