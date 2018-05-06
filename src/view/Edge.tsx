import * as React from 'react'
import { render } from 'react-dom'
import * as dagre from 'dagre'

interface EdgeProps {
  arrangedEdge: dagre.GraphEdge
}

export const Edge = (props: EdgeProps) => {
  let polyLinePoints = props.arrangedEdge.points.map(point => point.x + ',' + point.y).join(' ')

  return (
    <polyline
      key={polyLinePoints}
      points={polyLinePoints}
      style={{
        fill: 'none',
        stroke: 'black',
        strokeWidth: 1
      }}
    />
  )
}
