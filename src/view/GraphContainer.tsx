import * as React from 'react'
import { Graph } from './Graph'

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

export class GraphContainer extends React.Component<GraphProps, GraphState> {
  private stillMounted: boolean = false

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

    if (this.stillMounted) {
      this.setState({ graphLayout: graphLayout })
    }
  }

  async componentDidMount() {
    this.stillMounted = true
    if (!this.state.graphLayout) {
      this.computeLayout()
    }
  }

  componentWillUnmount() {
    this.stillMounted = false
  }

  render() {
    if (!this.state.graphLayout) {
      return (
        <h1>Loading ...</h1>
      )
    }
    const { graphLayout } = this.state

    return (
      <div>
        <div className="link underline dim yellow"
          style={{ cursor: 'pointer' }} onClick={this.restToInitialGraph}>Reset</div>
        <Graph
          graph={this.state.graph}
          graphLayout={graphLayout}
          onClick={this.focusGraphToNode}
        />
      </div>
    )
  }

  restToInitialGraph = () => {
    this.setState({
      graph: this.props.initialGraph
    })
  }
}
