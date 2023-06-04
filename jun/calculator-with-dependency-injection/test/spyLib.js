const createSpyFunction = (...returnValues) => {
  let callCount = 0;

  const fn = (...args) => {
    const previousCalls = fn.calls || [];
    fn.calls = [...previousCalls, { args }];
    return returnValues[callCount++];
  }

  fn.wasCalledOnce = (...args) => {
    if (callCount !== 1) return false;
    if (args.length === 0) return true;
    
    const actualArgs = fn.calls[0].args;
    if (actualArgs.length !== args.length) return false;
    return args.every((expected, index) => expected === actualArgs[index]);
  };

  fn.wasCalledTwice = () => callCount === 2;

  return fn;
};

exports.createSpyFunction = createSpyFunction;