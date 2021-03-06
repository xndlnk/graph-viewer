import * as _ from 'lodash'

export interface INode {
  id: string
  name?: string
  type?: string
  nodes?: INode[]
  edges?: IEdge[]
  properties?: Props
}

export interface IEdge {
  sourceId: string
  targetId: string
  type?: string
  properties?: Props
}

export interface Props {
  [key: string]: any
}

export class Node {
  public readonly id: string
  public readonly name: string
  public readonly type: string

  private nodes: Node[]
  private edges: Edge[]
  private properties: Props

  constructor(id: string, name: string, type: string, nodes: Node[], edges: Edge[], properties?: Props) {
    this.id = id
    this.name = name
    this.type = type
    this.nodes = nodes ? nodes : []
    this.edges = edges ? edges : []
    this.properties = properties || {}
  }

  static ofRawNode(rawNode: INode): Node {
    let nodes = rawNode.nodes ? rawNode.nodes.map(node => Node.ofRawNode(node)) : []
    let edges = rawNode.edges ? rawNode.edges.map(edge => Edge.ofRawEdge(edge)) : []
    let properties = rawNode.properties ? JSON.parse(JSON.stringify(rawNode.properties)) : {}
    return new Node(rawNode.id, rawNode.name, rawNode.type, nodes, edges, properties)
  }

  deepResolveNodeReferences() {
    // TODO:
  }

  deepFindParendNodeById(id: string): Node {
    const parentNode = this.findParentNodeById(id)
    if (parentNode) {
      return parentNode
    } else {
      return this.getNodes().map(node => node.deepFindParendNodeById(id)).find(parentNode => parentNode !== undefined)
    }
  }

  findParentNodeById(id: string): Node {
    if (this.getNodes().find(node => node.id === id)) {
      return this
    } else {
      return undefined
    }
  }

  sameId(otherId: string): boolean {
    return this.id === otherId
  }

  getLabel(): string {
    return this.properties.label ? this.properties.label : this.id
  }

  getNodes(): Node[] {
    return this.nodes
  }

  hasNodes(): boolean {
    return this.nodes.length > 0
  }

  getEdges(): Edge[] {
    return this.edges
  }

  getAllEdges(): Edge[] {
    return _.union(this.edges, _.flatten(this.nodes.map(node => node.edges)))
  }

  hasEdges(): boolean {
    return this.edges.length > 0
  }

  getProps(): Props {
    return this.properties
  }

  getProp(propName: string, alternativeValue: any): any {
    let value = this.properties ? this.properties[propName] : undefined
    return value ? value : alternativeValue
  }

  addProp(propName: string, value: any): any {
    this.properties[propName] = value
  }
}

export class Edge {
  public readonly sourceId: string
  public readonly targetId: string

  private source: Node = null
  private target: Node = null

  private properties: Props

  constructor(sourceId: string, targetId: string, properties?: Props) {
    this.sourceId = sourceId
    this.targetId = targetId
    this.properties = properties || {}
  }

  static ofRawEdge(rawEdge: IEdge): Edge {
    let properties = rawEdge.properties ? JSON.parse(JSON.stringify(rawEdge.properties)) : {}
    return new Edge(rawEdge.sourceId, rawEdge.targetId, properties)
  }
}
