//Link to my Video Presentation on YouTube below
// https://youtu.be/XT1hMn9LB7E

const RedBlackTree = require('./RedBlackTree.js');
const Node = require('./node.js');

describe('Red-Black Tree', () => {
  let rbTree;

  beforeEach(() => {
    rbTree = new RedBlackTree();
  });

  test('starts empty', () => {
    expect(rbTree.root).toBeNull();
  });

  test('inserts elements in a way that maintains Red-Black properties', () => {
    rbTree.insert(10);
    expect(rbTree.root.data).toBe(10);
    expect(rbTree.root.colour).toBe(1); // Assuming BLACK is 1

    rbTree.insert(15);
    rbTree.insert(5);
    expect(rbTree.root.colour).toBe(1); // Root must always be black
    expect(rbTree.root.left.colour).toBe(0); // Assuming RED is 0
    expect(rbTree.root.right.colour).toBe(0);

    rbTree.insert(2); // Should cause a rotation and/or color flip
    expect(rbTree.root.left.data).toBe(5);
    expect(rbTree.root.left.left.data).toBe(2);
    expect(rbTree.root.left.left.colour).toBe(0);
  });

  test('searches for existing and non-existing elements', () => {
    expect(rbTree.search(rbTree.root, 10)).toBeNull();

    rbTree.insert(20);
    rbTree.insert(30);
    rbTree.insert(10);
    rbTree.insert(25);

    expect(rbTree.search(rbTree.root, 30).data).toBe(30);
    expect(rbTree.search(rbTree.root, 99)).toBeNull();
  });

  test('deletes elements while maintaining Red-Black properties', () => {
    rbTree.insert(20);
    rbTree.insert(30);
    rbTree.insert(40);
    rbTree.insert(10);
    rbTree.insert(25);

    rbTree.deleteNode(10);
    expect(rbTree.search(rbTree.root, 10)).toBeNull();
    expect(rbTree.root.colour).toBe(1); // Check the root is still black
    expect(() => rbTree.validateProperties()).not.toThrow(); // Assuming a function that validates tree properties

    rbTree.deleteNode(30);
    expect(rbTree.search(rbTree.root, 30)).toBeNull();
    expect(() => rbTree.validateProperties()).not.toThrow();
  });

  // Additional function to validate Red-Black Tree properties across the tree
  function validateProperties(node = rbTree.root) {
    if (node === null) return 0;

    // Red node should not have red children
    if (node.colour === 0) { // Assuming RED is 0
      if (node.left !== null && node.left.colour === 0) throw new Error('Red violation');
      if (node.right !== null && node.right.colour === 0) throw new Error('Red violation');
    }

    // Check for valid binary search tree properties
    if (node.left !== null && node.left.data > node.data) throw new Error('BST violation');
    if (node.right !== null && node.right.data < node.data) throw new Error('BST violation');

    // Black height must be consistent
    let leftBlackHeight = validateProperties(node.left);
    let rightBlackHeight = validateProperties(node.right);
    if (leftBlackHeight !== rightBlackHeight) throw new Error('Black height violation');

    return node.colour === 1 ? leftBlackHeight + 1 : leftBlackHeight;
  }

});