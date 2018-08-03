import * as React from 'react'
import { render } from 'react-dom'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as model from '../domain/model'
import { NodeLayout, Layout } from './layout/layoutModel'
import styled, { css } from 'styled-components'
import { Edge } from './Edge'

export interface NodeProps extends RouteComponentProps<any> {
  graphLayout: Layout
  parentNode: model.Node
  node: model.Node
}

// TODO: use class
export const Node: any = withRouter((props: NodeProps) => {
  const urlForFocussingNode = getUrlForFocussingNode(props.match.url, props.node.id)
  const color = props.node.hasNodes() ? 'rgba(255, 241, 169, 0.5)' : '#fbf1a9'
  const nodeLayout = props.graphLayout.getNodeLayout(props.node.id)

  if (nodeLayout == null) {
    const errorMessage = 'cannot find layout for node ' + props.node.id + ' in layout: ' + JSON.stringify(props.graphLayout, null, 2)
    console.log(errorMessage)
    return (
      <div>
        error: cannot view present {props.node.id}
      </div>
    )
  }
  if (nodeLayout && nodeLayout.x === undefined) {
    const errorMessage = 'x missing on node ' + props.node.id
    console.log(errorMessage)
    return (
      <div>
        error: cannot view present {props.node.id}
      </div>
    )
  }

  return (
    <div
        className="ba f4"
        key={props.node.id}
        style={{
          position: 'absolute',
          left: nodeLayout.x,
          top: nodeLayout.y,
          backgroundColor: color,
          height: nodeLayout.height,
          width: nodeLayout.width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
    >
      <Link className="link underline-hover dark-blue hover-orange" to={urlForFocussingNode}>{props.node.name}</Link>

      {
        props.node.getNodes().map(node => (
            <Node
              node={node}
              parentNode={props.node}
              graphLayout={props.graphLayout}
            />
          )
        )
      }
    </div>
  )
})

function getUrlForFocussingNode(url: string, nodeId: string) {
  const focusUrlPath = `/focus/${nodeId}`

  const matchResult = url.match(/\/graph\/(\w+)/)
  if (matchResult) {
    return matchResult[0] + focusUrlPath
  } else {
    return url + focusUrlPath
  }
}
