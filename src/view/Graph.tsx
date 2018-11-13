import * as React from 'react'
import { Nodes } from './Nodes'
import { Edge } from './Edge'
import * as model from '../domain/model'
import { Layout } from './layout/layoutModel'
import { DagreLayout } from './layout/DagreLayout'
import { KlayLayout } from './layout/KlayLayout'

import { GraphService } from '../domain/service'
import { NodeFocusser } from '../domain/NodeFocusser'

export interface GraphProps {
  initialGraph: model.Node
}

export interface GraphState {
  graph: model.Node,
  graphLayout: Layout
}

export class Graph extends React.Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props)
    this.state = {
      graph: props.initialGraph,
      graphLayout: null
    }
  }

  focusGraphToNode = (focusedNode: model.Node) => {
    const graphService = new GraphService(this.props.initialGraph)

    const nodeFocussor = new NodeFocusser(graphService)
    const focusedGraph = nodeFocussor.focusNode(focusedNode)

    this.setState({
      graph: focusedGraph
    })
  }

  async computeLayout() {
    // INFO: this is not needed, just playing
    await new Promise(function(resolve) {
      setTimeout(resolve, 50)
    })

    const layout = new KlayLayout(this.state.graph)
    const graphLayout = await layout.computeLayout()
    this.setState({ graphLayout: graphLayout })
  }

  async componentDidMount() {
    if (!this.state.graphLayout) {
      this.computeLayout()
    }
  }

  render() {
    if (!this.state.graphLayout) {
      return (
        <h1>Loading ...</h1>
      )
    }
    const layout = this.state.graphLayout
    // console.log(JSON.stringify(layout, null, 2))

    // INFO: svg edges have to be included all at once here.
    // using higher z-index for svg is not working because div-elements are not accessible anymore.
    return (
      <div
        style={{
          width: layout.getGraphWith(),
          height: layout.getGraphHeight(),
          position: 'relative'
        }}
      >
        <Nodes nodes={this.state.graph.getNodes()} graphLayout={layout}
          onClick={this.focusGraphToNode}></Nodes>

        <svg width={layout.getGraphWith() + 10} height={layout.getGraphHeight() + 10}>
          {
            this.state.graph.getAllEdges().map(edge => (
              <Edge key={edge.sourceId + '-' + edge.targetId} edge={edge} arrangedEdge={layout.getEdgeLayout(edge.sourceId, edge.targetId)} />
            ))
          }
        </svg>
      </div>
    )
  }
}
