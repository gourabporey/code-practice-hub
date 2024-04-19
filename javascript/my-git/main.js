const Git = require("./git");

const main = () => {
  const git = new Git();
  git.commit("This is the first commit message");
  git.commit("This is the first commit message");
  git.commit("This is the first commit message");
  console.log(git.log());
};

main();
