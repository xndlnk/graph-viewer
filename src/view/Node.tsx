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

  let left = nodeLayout.x - nodeLayout.width / 2
  let top = nodeLayout.y - nodeLayout.height / 2

  if (props.parentNode) {
    const parentNodeLayout = props.graphLayout.getNodeLayout(props.parentNode.id)
    left = left - (parentNodeLayout.x - parentNodeLayout.width / 2)
    top = top - (parentNodeLayout.y - parentNodeLayout.height / 2)
  }

  return (
    <div
        className="ba f4"
        key={props.node.id}
        style={{
          position: 'absolute',
          left: left,
          top: top,
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
