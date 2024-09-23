import Node, {RED, BLACK} from './node.js';
export default class RedBlackTree {
  constructor() {
    this.root = null;
  }

  leftRotate(node) {
    
  }

  rightRotate(node) {
    
  }

  fixNodeInsertion(node) {
    //TODO
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

  search(root) {
    // TODO
  }
  
  delete(root) {
   // TODO 
  }
}