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

const $ = (...selectors) => {
  if(typeof selectors[0] == "function") {
    document.addEventListener("DOMContentLoaded", selectors[0])
  }
  else if(/<[a-z/][\s\S]*>/i.test(selectors[0])) {
    return generateCollection(parse(selectors[0]))
  }
  else if(typeof selectors[0] == "string") {
    return generateCollection(document.querySelectorAll(selectors[0]))
  }
  else if(selectors[0].tagName) {
    return generateCollection([selectors[0]]) 
  }
}

class NodeCollection {
  constructor(nodes) {
    this.nodes = nodes

    const methods = [ "css", "on", "append" ]
    for(const method of methods) {
      this[method] = (...args) => {
        this.nodes.forEach(node => {
          node[method](...args)
        })
      }
    }
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
  prepend(nodeList) {
    nodeList.each((nodeClass) => {
      this.node.prepend(nodeClass.node)
    })
  }
  append(nodeList) {
    nodeList.each((nodeClass) => {
      this.node.append(nodeClass.node)
    })
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

// function $(...) {
//   if(typeof selector == "function") {
//     document.addEventListener("DOMContentLoaded", selector)
//     document.addEventListener("load", selector)
//   }
// }

export default $