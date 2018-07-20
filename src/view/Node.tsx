import * as React from 'react'
import { render } from 'react-dom'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as model from '../domain/model'
import styled, { css } from 'styled-components'

export interface NodeProps extends RouteComponentProps<any> {
  x: number
  y: number
  width: number
  height: number
  node: model.Node
}

export const Node = withRouter((props: NodeProps) => {
  const urlForFocussingNode = getUrlForFocussingNode(props.match.url, props.node.id)
  const color = props.node.hasNodes() ? 'rgba(255, 0, 0, 0.2)' : 'bg-light-yellow'

  return (
    <div
        className="bg-light-yellow ba f4"
        key={props.node.id}
        style={{
          position: 'absolute',
          left: props.x - props.width / 2,
          top: props.y - props.height / 2,
          height: props.height,
          width: props.width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
    >
      <Link className="link underline dark-blue hover-orange" to={urlForFocussingNode}>{props.node.name}</Link>
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
