import BinarySearchTree from "./src/BinarySearchTree.js";

const main = () => {
  const bst = new BinarySearchTree();
  bst.insert(10).insert(5).insert(11).insert(6).insert(12).insert(4);
  console.log(bst.toString());
};

main();
