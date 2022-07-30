const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class ListNode {
  constructor(x) {
    this.value = x;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.queue = null;
  }

  getUnderlyingList() {
    return this.queue;
  }

  enqueue(value) {
    let node = new ListNode(value);
    if (this.queue === null) {
      this.queue = node;
    } else {
      let list = this.queue;
      while (list.next) list = list.next;
      list.next = node;
    }
  }

  dequeue() {
    if (this.queue === null) return null;
    let result = this.queue.value;
    this.queue = this.queue.next;
    return result;
  }
}

module.exports = {
  Queue,
};
