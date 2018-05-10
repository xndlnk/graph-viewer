import * as React from 'react'
import { render } from 'react-dom'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as model from '../domain/model'

export interface NodeProps extends RouteComponentProps<any> {
  id: string
  x: number
  y: number
  width: number
  height: number
  node: model.Node
}

export const Node = withRouter((props: NodeProps) => {
  let urlForFocussingNode = getUrlForFocussingNode(props.match.url, props.id)

  let propsColor = props.node.getProps() ? props.node.getProps().color : undefined
  let color = propsColor ? propsColor : 'lightgrey'

  return (
    <div
        key={props.id}
        style={{
          position: 'absolute',
          left: props.x - props.width / 2,
          top: props.y - props.height / 2,
          background: color,
          height: props.height,
          width: props.width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          fontFamily: 'Roboto, sans-serif'
        }}
    >
      <Link to={urlForFocussingNode}>{props.id}</Link>
    </div>
  )
})

function getUrlForFocussingNode(matchUrl: string, nodeId: string) {
  let focusPathStart = matchUrl.lastIndexOf('/focus')
  let rootUrl = focusPathStart > 0 ? matchUrl.substr(0, focusPathStart) : matchUrl
  return rootUrl + `/focus/${nodeId}`
}
