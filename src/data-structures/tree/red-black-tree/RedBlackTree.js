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
  
  delete(root) {
   
  }
}