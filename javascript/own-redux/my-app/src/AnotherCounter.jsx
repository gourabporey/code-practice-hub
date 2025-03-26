import React, { useEffect, useState } from "react";
import store from "./state-management/store";
import { increment, decrement, counterReducer } from "./reducers/MyReducers";
import StoreContainer from "./state-management/StoreContainer";

const Counter = () => {
  const [count, setCount] = useState(store.getState().count || 0);
  const dispatch = store.dispatch;

  useEffect(() => {
    store.subscribe((newState) => setCount(newState.count));
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default StoreContainer(Counter, { count: counterReducer });
