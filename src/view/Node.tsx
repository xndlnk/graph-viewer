import * as React from 'react'
import { render } from 'react-dom'
import { Route, Link, match, RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as model from '../domain/model'
import { NodeLayout, Layout } from './layout/layoutModel'
import styled, { css } from 'styled-components'
import { Nodes } from './Nodes'
import { NodeViewProps } from './NodeViewProps'

export interface NodeProps extends NodeViewProps {
  node: model.Node
}

export class Node extends React.Component<NodeProps, any> {

  onClickHandler = (event: any) => {
    this.props.onClick(this.props.node)
  }

  render() {
    const { node, graphLayout, onClick } = this.props

    const color = node.hasNodes() ? 'rgba(255, 241, 169, 0.5)' : '#fbf1a9'
    const nodeLayout = graphLayout.getNodeLayout(node.id)
    const { x, y, width, height } = nodeLayout

    let content: any = node.name
    if (onClick) {
      content = <div onClick={this.onClickHandler} style={{ cursor: 'pointer' }} className="link underline dim blue">
        {node.name}
      </div>
    }

    return (
      <div
        className="ba f4"
        style={{
          position: 'absolute',
          left: x,
          top: y,
          backgroundColor: color,
          height: height,
          width: width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {content}
        <Nodes nodes={node.getNodes()} graphLayout={graphLayout} onClick={onClick}></Nodes>
      </div>
    )
  }
}
