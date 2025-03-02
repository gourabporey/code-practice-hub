class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }

    return this;
  }

  insertNode(root, node) {
    if (node.value > root.value) {
      if (root.right === null) {
        root.right = node;
      } else {
        this.insertNode(root.right, node);
      }
    } else {
      if (root.left === null) {
        root.left = node;
      } else {
        this.insertNode(root.left, node);
      }
    }
  }

  toString() {
    return this.printTree(this.root, 0);
  }

  printTree(node, level) {
    if (node === null) {
      return "";
    }

    let treeStr = "";
    treeStr += this.printTree(node.right, level + 1);
    treeStr += " ".repeat(level * 4) + node.value + "\n";
    treeStr += this.printTree(node.left, level + 1);

    return treeStr;
  }
}

export default BinarySearchTree;
