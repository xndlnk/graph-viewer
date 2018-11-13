import * as model from '../domain/model'
import { Layout } from './layout/layoutModel'

export interface NodeViewProps {
  graphLayout: Layout
  onClick?: (node: model.Node) => void
}
