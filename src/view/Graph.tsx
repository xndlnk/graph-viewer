import * as React from 'react'
import { render } from 'react-dom'
import { Node } from './Node'
import { Edge } from './Edge'
import * as model from '../domain/model'
import { Layout } from './layout/layoutModel'
import { withRouter } from 'react-router'
import { DagreLayout } from './layout/DagreLayout'
import { KlayLayout } from './layout/KlayLayout'
import { GraphProvider } from '../graphProvider/graphProvider'

export interface GraphProps {
  graph: model.Node
}

export interface GraphState {
  graphLayout: Layout
}

export class Graph extends React.Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props)
    this.state = {
      graphLayout: null
    }
  }

  async componentDidMount() {
    // INFO: this is not needed, just playing
    await new Promise(function(resolve) {
      setTimeout(resolve, 50)
    })

    const layout = new KlayLayout(this.props.graph)
    const graphLayout = await layout.computeLayout()
    this.setState({ graphLayout: graphLayout })
  }

  componentWillUnmount() {
    this.setState({
      graphLayout: null
    })
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
        key="graph"
        style={{
          width: layout.getGraphWith(),
          height: layout.getGraphHeight(),
          position: 'relative'
        }}
      >
        {
          this.props.graph.getNodes().map(node => (
              <Node
                node={node}
                graphLayout={layout}
              />
            )
          )
        }
        <svg width={layout.getGraphWith() + 10} height={layout.getGraphHeight() + 10}>
          {
            this.props.graph.getAllEdges().map(edge => (
              <Edge edge={edge} arrangedEdge={layout.getEdgeLayout(edge.sourceId, edge.targetId)} />
            ))
          }
        </svg>
      </div>
    )
  }
}
