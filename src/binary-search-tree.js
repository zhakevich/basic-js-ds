const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.data = [];
    this.tree = {};
    this.tree.rootNode = null;
  }

  root() {
    return this.tree.rootNode;
  }

  add(data) {
    if (this.tree.rootNode === null) {
      this.tree.rootNode = new Node(null, data);
      this.data.push(data);
      return;
    }
    let node = this.tree.rootNode;
    while (node.right !== null || node.left !== null) {
      if (node.data > data) {
        if (node.left === null) break;
        node = node.left;
      } else if (node.data < data) {
        if (node.right === null) break;
        node = node.right;
      }
    }
    new Node(node, data).addToTree();
    this.data.push(data);
  }

  has(data) {
    return this.data.includes(data);
  }

  find(data) {
    if (!this.has(data)) return null;
    let node = this.tree.rootNode;
    while (node.data !== data) {
      if (node.data > data) {
        node = node.left;
      } else if (node.data < data) {
        node = node.right;
      }
    }
    return node;
  }

  remove(data) {
    if (!this.has(data)) return;

    let node = this.find(data);
    if (node.left === null && node.right === null) {
      node.parent[node.position] = null;
    } else if (node.left === null && node.right !== null) {
      node.right.position = node.position;
      node.right.parent = node.parent;
      if (this.root().data !== data) node.parent[node.position] = node.right;
    } else if (node.left !== null && node.right === null) {
      node.left.position = node.position;
      node.left.parent = node.parent;
      if (this.root().data !== data) node.parent[node.position] = node.left;
    } else if (node.left !== null && node.right !== null) {
      let minSubNode = node.right;
      while (minSubNode.left !== null) {
        minSubNode = minSubNode.left;
      }
      this.remove(minSubNode.data);
      node.data = minSubNode.data;
    }

    this.data = [];
    this.refreshData(this.tree.rootNode);
  }

  refreshData(node) {
    if (node === null) return;
    this.data.push(node.data);
    this.refreshData(node.left);
    this.refreshData(node.right);
  }

  min() {
    return Math.min(...this.data);
  }

  max() {
    return Math.max(...this.data);
  }
}

class Node {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;
    this.left = null;
    this.right = null;
  }
  addToTree() {
    if (this.parent.data > this.data) {
      this.parent.left = this;
      this.position = 'left';
    } else if (this.parent.data < this.data) {
      this.parent.right = this;
      this.position = 'right';
    }
  }
}

module.exports = {
  BinarySearchTree,
};
