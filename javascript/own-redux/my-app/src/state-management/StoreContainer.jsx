import React from "react";
import store from "./store";

const StoreContainer = (Component, reducers) => {
  if (!React.isValidElement(<Component />)) {
    throw new Error("Component must be valid react component");
  }

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = store.getState();
      this.instSubscriber = this.subscriber.bind(this);
      store.subscribe(this.instSubscriber);
      store.addReducers(reducers);
    }

    subscriber(currentState) {
      this.setState(currentState);
    }

    componentWillUnmount() {
      store.unSubscribe(this.instSubscriber);
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
};

export default StoreContainer;
