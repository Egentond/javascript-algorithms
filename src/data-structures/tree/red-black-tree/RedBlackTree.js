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
    

  }


  insert(data) {
    let newNode = new Node(data);
  
    if(root===null) {
        this.root = newNode;
        this.root.colour = BLACK;
    } else {
      let currentNode = this.root;
      let parentNode = null;
    
      while(currentNode !== null) {
        parentNode = currentNode;
        if(newNode.data < currentNode.data) {
          currentNode = currentNode.left;
        } else {
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
    if(node === null || data === node.data) {
      return node;
    }

    if(data < node.data) {
      return this.search(node.left, data);
    }
    else {
      return this.search(node.right, data);
    }
  }
  
  delete(root) {
   
  }
}