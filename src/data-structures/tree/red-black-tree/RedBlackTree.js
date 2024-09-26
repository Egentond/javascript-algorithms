//Link to my Video Presentation on YouTube below
// https://youtu.be/XT1hMn9LB7E


import Node, {RED, BLACK} from './node.js';
export default class RedBlackTree {
  constructor() {
    this.root = null;
  }

  leftRotate(node) {
    let temp = node.right;
    node.right = temp.left;
    if(temp.left !== null) {
      temp.left.parent = node;
    }
    temp.parent = node.parent;
    if(node.parent === null) {
      this.root = temp
    } 
    else if(node === node.parent.left) {
      node.parent.left = temp;
    }
    else {
      node.parent.right = temp;
    }
    temp.left = node;
    node.parent = temp;
  }

  rightRotate(node) {
    let temp = node.left;
    node.left = temp.right;
    if(temp.right !== null) {
      temp.right.parent = node;
    }
    temp.parent = node.parent;
    if(node.parent === null) {
      this.root = temp;
    }
    else if(node === node.parent.right) {
      node.parent.right = temp;
    }
    else {
      node.parent.left = temp;
    }
    temp.right = node;
    node.parent = temp;
  }

  fixNodeInsertion(node) {
    // While the node's parent is red
    while (node !== this.root && node.parent.colour === RED) {
      let parent = node.parent;
      let grandparent = parent.parent;
      // If parent is the left child of the grandparent
      if (parent === grandparent.left) {
        let uncle = grandparent.right;
        // Case 1: If the uncle is red, recolor
        if (uncle !== null && uncle.colour === RED) {
          parent.colour = BLACK;
          uncle.colour = BLACK;
          grandparent.colour = RED;
          node = grandparent; // Move the node pointer up to the grandparent and continue fixing
        } else {
          // Case 2: If the node is a right child, left-rotate parent
          if (node === parent.right) {
            node = parent;
            this.leftRotate(node);
          }  
          // Case 3: Recolor and right-rotate grandparent
          parent.colour = BLACK;
          grandparent.colour = RED;
          this.rightRotate(grandparent);
        }
      } else {
        // Symmetric cases when the parent is the right child of the grandparent
        let uncle = grandparent.left;
        if (uncle !== null && uncle.colour === RED) {
          parent.colour = BLACK;
          uncle.colour = BLACK;
          grandparent.colour = RED;
          node = grandparent;
        } else {
          if (node === parent.left) {
            node = parent;
            this.rightRotate(node);
          }
          parent.colour = BLACK;
          grandparent.colour = RED;
          this.leftRotate(grandparent);
        }
      }
    }
    // Ensure the root is always black
    this.root.colour = BLACK;
  }
  
  insert(data) {
    let newNode = new Node(data);
    // Check if the tree is empty insert the node at the root, or reached a null leaf node insert the node at the current leaf
    if(root===null) {
        this.root = newNode;
        this.root.colour = BLACK;
    } else {
      let currentNode = this.root;
      let parentNode = null;
      // Traverse the tree to find where the node should be inserted
      while(currentNode !== null) {
        parentNode = currentNode;
        if(newNode.data < currentNode.data) {   
          // If the value of node is less than the current node in the tree, go left
          currentNode = currentNode.left;
        } else {
          // Otherwise if value of node is greater than the current node in the tree, go right
          currentNode = currentNode.right;      
        }
      }
      newNode.parent = parentNode;
      if(newNode < parentNode) {
        parentNode.left = newNode;
      } else {
        parentNode.right = newNode;
      }
      this.fixNodeInsertion(newNode);
    }
  }

  search(node, data) {
    // if the node is null, return the current node, or if the data matches the datain the current node return the current node as found
    if(node === null || data === node.data) {     
      return node;
    }
    // If data is less than the value in the current node go left, recursively calling the search function with the left child node
    if(data < node.data) {
      return this.search(node.left, data);
    }
    // If data is greater than the value in the current node go right, recursively calling the search function with the right child node
    else {
      return this.search(node.right, data);
    }
  }
  
  deleteNode(data) {
    let node = this.search(this.root, data);
    if (node === null) return; // Node not found, nothing to delete
    let y = node;
    let yOriginalColour = y.colour;
    let x; // The node that will replace the deleted node
    // Case 1: Node has no left child, just promote right child (or null)
    if (node.left === null) {
        x = node.right;
        this.transplant(node, node.right);
    } 
    // Case 2: Node has no right child, just promote left child
    else if (node.right === null) {
        x = node.left;
        this.transplant(node, node.left);
    } 
    // Case 3: Node has two children, find successor
    else {
        y = this.minimum(node.right);  // find the successor by finding the smallest node in the right subtree
        yOriginalColour = y.colour;
        x = y.right;
        if (y.parent === node) {
            if (x !== null) x.parent = y;
        } else {
            this.transplant(y, y.right);
            y.right = node.right;
            y.right.parent = y;
        }

        this.transplant(node, y);
        y.left = node.left;
        y.left.parent = y;
        y.colour = node.colour;
    }
    // We need to call fixNodeDeletion to restore the properties of the red black tree if the origional colour of the deleted node was black
    if (yOriginalColour === BLACK) {
        this.fixNodeDeletion(x);
    }
  }

  // Find the minimum node in the tree
  minimum(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
  }

  // Find the maximum node in the tree
  maximum(node) {
    while(node.right !== null) {
      node = node.right;
    }
    return node;
  }

  // This promotes the successor of the node that is being deleted
  // it fixes pointers around the deleted node
  // if the node being deleted has a parent node, set the parent to point to the successor and vice versa
  transplant(u, v) {
    if (u.parent === null) {  // If the node being deleted has no parent, set the successor replacing the deleted node to be the root
        this.root = v;
    } else if (u === u.parent.left) { // If deleted node has a parent, make the parent point to the new child and vice versa
        u.parent.left = v;
    } else {
        u.parent.right = v;           
    }

    if (v !== null) {      // if the successor is not null, then make the parent property point to the nodes new parent, which was the deleted nodes parent
        v.parent = u.parent;
    }
  } 

  // This function will restore the properties of the RB Tree after a node that was deleted had an origional colour that was black
  // If the origional colour of the node that was deleted was red, the properties of the tree are maintained and no need to call this function
  fixNodeDeletion(x) {
    while (x !== this.root && (x === null || x.colour === BLACK)) {
        if (x === x.parent.left) {
            let w = x.parent.right;

            // Case 1: Sibling is red
            if (w.colour === RED) {
                w.colour = BLACK;
                x.parent.colour = RED;
                this.leftRotate(x.parent);
                w = x.parent.right;
            }
            // Case 2: Sibling's children are both black
            if ((w.left === null || w.left.colour === BLACK) && 
                (w.right === null || w.right.colour === BLACK)) {
                w.colour = RED;
                x = x.parent;
            } else {
                // Case 3: Sibling's right child is black, left child is red
                if (w.right === null || w.right.colour === BLACK) {
                    if (w.left !== null) w.left.colour = BLACK;
                    w.colour = RED;
                    this.rightRotate(w);
                    w = x.parent.right;
                }

                // Case 4: Sibling's right child is red
                if (w.right !== null) w.right.colour = BLACK;
                w.colour = x.parent.colour;
                x.parent.colour = BLACK;
                if (w.right !== null) w.right.colour = BLACK;
                this.leftRotate(x.parent);
                x = this.root;
            }
        } else {
            // Symmetric cases for when x is the right child
            let w = x.parent.left;

            if (w.colour === RED) {
                w.colour = BLACK;
                x.parent.colour = RED;
                this.rightRotate(x.parent);
                w = x.parent.left;
            }

            if ((w.right === null || w.right.colour === BLACK) && 
                (w.left === null || w.left.colour === BLACK)) {
                w.colour = RED;
                x = x.parent;
            } else {
                if (w.left === null || w.left.colour === BLACK) {
                    if (w.right !== null) w.right.colour = BLACK;
                    w.colour = RED;
                    this.leftRotate(w);
                    w = x.parent.left;
                }

                if (w.left !== null) w.left.colour = BLACK;
                w.colour = x.parent.colour;
                x.parent.colour = BLACK;
                if (w.left !== null) w.left.colour = BLACK;
                this.rightRotate(x.parent);
                x = this.root;
            }
        }
    }
    if (x !== null) x.colour = BLACK;
  }
}