export interface RawNode {
  id: string
  nodes?: RawNode[]
  edges?: RawEdge[]
  props?: Props
}

export interface RawEdge {
  sourceId: string
  targetId: string
  props?: Props
}

export interface Props {
  [key: string]: any
}

export class Node {
  public readonly id: string

  private nodes: Node[]
  private edges: Edge[]
  private props: Props

  constructor(id: string, nodes: Node[], edges: Edge[], props?: Props) {
    this.id = id
    this.nodes = nodes ? nodes : []
    this.edges = edges ? edges : []
    this.props = props
  }

  static ofRawNode(rawNode: RawNode): Node {
    let nodes = rawNode.nodes ? rawNode.nodes.map(node => Node.ofRawNode(node)) : []
    let edges = rawNode.edges ? rawNode.edges.map(edge => Edge.ofRawEdge(edge)) : []
    let props = rawNode.props ? JSON.parse(JSON.stringify(rawNode.props)) : undefined
    return new Node(rawNode.id, nodes, edges, props)
  }

  deepResolveNodeReferences() {
    // TODO:
  }

  sameId(otherId: string): boolean {
    return this.id === otherId
  }

  getLabel(): string {
    return this.props.label ? this.props.label : this.id
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

  hasEdges(): boolean {
    return this.edges.length > 0
  }

  getProps(): Props {
    return this.props
  }

  getProp(propName: string, alternativeValue: any): any {
    let value = this.props ? this.props[propName] : undefined
    return value ? value : alternativeValue
  }
}

export class Edge {
  public readonly sourceId: string
  public readonly targetId: string

  private source: Node = null
  private target: Node = null
  private kind?: string

  private props: Props

  constructor(sourceId: string, targetId: string, props?: Props) {
    this.sourceId = sourceId
    this.targetId = targetId
    this.props = props
  }

  static ofRawEdge(rawEdge: RawEdge): Edge {
    let props = rawEdge.props ? JSON.parse(JSON.stringify(rawEdge.props)) : undefined
    return new Edge(rawEdge.sourceId, rawEdge.targetId, props)
  }
}
