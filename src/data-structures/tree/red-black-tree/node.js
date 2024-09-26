//Link to my Video Presentation on YouTube below
// https://youtu.be/XT1hMn9LB7E

export const RED = 0;
export const BLACK = 1;

export default class Node {
  constructor(data) {
    this.data = data;
    this.colour = RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}