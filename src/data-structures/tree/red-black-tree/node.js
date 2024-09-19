export const RED = 0;
export const BLACK = 1;

export default class Node {
  constructor(data, colour, left = null, right = null, parent = null) {
    this.data = data;
    this.colour = colour;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}