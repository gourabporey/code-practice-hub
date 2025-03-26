let store = null;

const getInstance = () => {
  if (!store) return createStore();
  return store;
};

const cloneDeep = (state) => JSON.parse(JSON.stringify(state));

const createStore = () => {
  let currentState = {};
  const subscribers = [];
  let currentReducerSet = {};
  let previousState;

  let currentReducer = (state, action) => state;
  const getState = () => cloneDeep(currentState);
  const subscribe = (fn) => subscribers.push(fn);
  const unSubscribe = (fn) => subscribers.splice(subscribers.indexOf(fn), 1);

  const dispatch = (action) => {
    previousState = currentState;
    currentState = currentReducer(cloneDeep(currentState), action);
    subscribers.forEach((subscriber) =>
      subscriber(currentState, previousState)
    );
  };

  const addReducers = (reducers) => {
    currentReducerSet = Object.assign(currentReducerSet, reducers);

    currentReducer = (state, action) => {
      let cumulativeState = {};

      for (const key in reducers) {
        cumulativeState[key] = currentReducerSet[key](state[key], action);
      }

      return cumulativeState;
    };
  };

  return {
    dispatch,
    subscribe,
    unSubscribe,
    addReducers,
    getState,
  };
};

export default getInstance();
