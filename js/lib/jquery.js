const parse = (string) => {
  let div = document.createElement("div")
  div.innerHTML = string
  return div.childNodes
}

const generateCollection = (nodeList) => {
  const collection = new NodeCollection(
    [...nodeList].map(node => new Node(node))
  )
  return collection
}

const $ = (query) => {
  if(typeof query == "function") {
    document.addEventListener("DOMContentLoaded", query)
  }
  else if(/<[a-z/][\s\S]*>/i.test(query)) {
    return generateCollection(parse(query))
  }
  else if(typeof query == "string") {
    return generateCollection(document.querySelectorAll(query))
  }
  else if(query.tagName) {
    return generateCollection([query]) 
  }
}
class NodeCollection {
  constructor(nodes) {
    this.nodes = nodes
    return this.nodes.length <= 1 ? this.nodes.shift() : this
  }
  static isCollection(nodes) {
    return nodes.constructor.name == "NodeCollection"
  }
  each(callback) {
    this.nodes.forEach((node, index) => {
      callback(node, index)
    })
  }

}

class Node {
  constructor(node) {
    this.node = node
  }
  serialize() {
    return this.node.outerHTML
  }
  prepend(nodes) {
    NodeCollection.isCollection(nodes)
      ? nodes.each((nodeClass) => this.node.prepend(nodeClass.node))
      : this.node.prepend(nodes.node)
  }
  append(nodes) {
    NodeCollection.isCollection(nodes)
      ? nodes.each((nodeClass) => this.node.append(nodeClass.node))
      : this.node.append(nodes.node)
  }
  text(value) {
    this.node.textContent = value
  }
  css(property, value) {
    if(typeof property == "string") {
      if(!value) {
        let styles = window.getComputedStyle(this.node)
        return styles.getPropertyValue(property)
      }
      else {
        this.node.style[property] = value
      }
    }
    else {
      Object.assign(this.node.style, property)
    }
  }
  on(type, callback) {
    document.addEventListener(type, callback)
  }
}

export default $