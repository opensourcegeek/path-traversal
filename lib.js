

class Tree {
  constructor(rootNode) {
    this.root = rootNode;
  }

  find(url) {
    let currentNode = this.root;
    while(currentNode !== null) { 
      if (currentNode.url === url) {
        return currentNode;
      }

      for (let [key, node] of currentNode.nodes.entries()) {
        const foundNode = node.findNode(url);
        if (foundNode !== undefined) {
          return foundNode;
        }

        if (node.next !== null) {
          currentNode = node;
          break;
        }
      }
      currentNode = currentNode.next;
    }
  }

  addNodeTo(url, node) {
    const foundNode = this.find(url);
    console.log(`searching for ${url}`);
    if (foundNode) {
      foundNode.addNode(node); 
    }
  }

  addNodeAfter(url, node) {
    const foundNode = this.find(url);
    if (foundNode) {
      foundNode.setNextNode(node);
    }
  }

  printFullTree() {
    let currentNode = this.root;
    while (currentNode !== null) {
      console.log(currentNode.url);
      for(let [key, node] of currentNode.nodes.entries()) {
        console.log('  ', key);
        if (node.next !== null) {
          currentNode = node;
          break;
        }
      }
      currentNode = currentNode.next;
    }
  }
}


class Node {
  constructor(url, validation, config) {
    this.url = url;
    this.validation = validation;
    this.config = config;
    this.next = null;
    this.prev = null;
    this.nodes = new Map();
  }

  findNode(url) {
    for (let [key, node] of this.nodes.entries()) {
      if (node.url === url) {
        return node;
      }
    }
  }

  addNode(node) {
    this.nodes.set(node.url, node);
  }

  setNextNode(node) {
    if (this.next === null) {
      this.next = node;
    } else {
      // adding inbetween
      let temp = this.next;
      this.next = node;
      this.next.next = temp;
    }
  }

}


const tryTree = () => {
  const node = new Node('/a', { foo: 'Foo' });
  let tree = new Tree(node);
  tree.addNodeAfter('/a', new Node('/b', { boo: 'Boo' }));
  tree.addNodeAfter('/b', new Node('/c', { foo: 'Foo' }));
  tree.addNodeTo('/b', new Node('/d', { zoo: 'zoo' }));
  tree.addNodeTo('/b', new Node('/e', { zoo: 'Bzoo' })); 
  tree.addNodeAfter('/a', new Node('/z', {zoo: 'zoo'}));
  tree.addNodeAfter('/d', new Node('/y', {zoo: 'zoo'}));
  tree.printFullTree();
}

tryTree();
