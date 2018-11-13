import * as React from 'react'
import { render } from 'react-dom'
import { Graph } from './Graph'
import * as model from '../domain/model'
import { GraphProvider } from '../graphProvider/graphProvider'

// TODO: later we can use redux for this

export interface GraphProps {
  graphProvider: GraphProvider
}

export interface GraphState {
  graph: model.Node
}

export class GraphLoader extends React.Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props)
    this.state = {
      graph: null
    }
  }

  async componentDidMount() {
    const graph = await this.props.graphProvider.loadGraph()
    this.setState({ graph: graph })
  }

  componentWillUnmount() {
    this.setState({
      graph: null
    })
  }

  render() {
    if (!this.state.graph) {
      return (
        <h1>Loading ...</h1>
      )
    }

    return (
      <Graph graph={this.state.graph}/>
    )
  }
}
