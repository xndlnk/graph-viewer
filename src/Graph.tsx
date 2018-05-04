import * as React from 'react'
import { render } from 'react-dom'
import * as dagre from 'dagre'
import { Node } from './Node'

export interface GraphProps {
  width: number
  height: number
  nodes: dagre.Node[]
  edges: dagre.GraphEdge[]
}

export class Graph extends React.Component<GraphProps, any> {
  constructor(props: GraphProps) {
    super(props)
  }

  render() {
    let polyLinePoints = this.props.edges.map(edge => {
      return edge.points.map(point => point.x + ',' + point.y).join(' ')
    })

    return (
      <div
        // width={this.props.width}
        // height={height}
        style={{
          position: 'relative'
        }}
      >
        {this.props.nodes.map(node => (
          <Node
            id={node.id}
            x={node.x}
            y={node.y}
            height={node.height}
            width={node.width}
            color={node.color}
          />
        ))}
        <svg width={this.props.width} height={this.props.height}>
          {polyLinePoints.map(points => (
            <polyline
              key={points}
              points={points}
              style={{
                fill: 'none',
                stroke: 'black',
                strokeWidth: 1
              }}
            />
          ))}
        </svg>
      </div>
    )
  }
}
