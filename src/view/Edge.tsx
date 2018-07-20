import * as React from 'react'
import { render } from 'react-dom'
import * as dagre from 'dagre'
import * as model from '../domain/model'

interface EdgeProps {
  arrangedEdge: dagre.GraphEdge
  edge: model.Edge
}

export const Edge = (props: EdgeProps) => {
  let polyLinePoints = props.arrangedEdge.points.map(point => point.x + ',' + point.y).join(' ')

  return (
    <polyline
      key={props.edge.sourceId + '-' + props.edge.targetId}
      points={polyLinePoints}
      style={{
        fill: 'none',
        stroke: 'black',
        strokeWidth: 1.25
      }}
    />
  )
}
