const bank = function() {
  const accounts = [];

  const bankAccount = function(id) {
    const showBalance = function() {
      return accounts[id].balance;
    };

    const deposit = function(amount) {
      accounts[id].balance += amount;
    };

    const withdraw = function(amount) {
      if(accounts[id].balance < amount) {
        console.error("Insufficient balance");
        return;
      };

      accounts[id].balance -= amount;
      return amount;
    };

    const transfer = function(otherAcc, amount) {
      otherAcc.deposit(amount);
      withdraw(amount);
    };

    const showInfo = function() {
      return accounts[id];
    };

    return { showBalance, deposit, withdraw, showInfo, transfer };
  };

  const generateAccNo = function() {
    return accounts.length + 1;
  };

  const createAccount = function(name, contact, initialAmount) {
    const accountNo = generateAccNo();
    const account = bankAccount(accountNo);
    accounts[accountNo] = {name, contact, balance: initialAmount};
    return account;
  };

  return { createAccount };
};
