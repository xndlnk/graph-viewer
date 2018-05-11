import * as largeGraphLegacy from './largeGraphLegacy'
import * as model from '../domain/model'

const largeGraphRaw: model.RawNode = convertLegacySystemToNode(largeGraphLegacy.graph, 1)
export const largeGraph: model.Node = model.Node.ofRawNode(largeGraphRaw)

function convertLegacySystemToNode(system: largeGraphLegacy.System, level: number): model.RawNode {
  let name = level === 2 ? 'cabinet_' + system.name : system.name
  let node: model.RawNode = {
    id: name
  }

  node.nodes = []
  system.services.forEach((service) => {
    node.nodes.push(convertServiceToNode(service))

    system.subSystems.forEach((subSystem) => {
      node.nodes.push(convertLegacySystemToNode(subSystem, level + 1))
    })
  })

  node.edges = []
  system.links.forEach((link) => {
    node.edges.push(convertLinkToEdge(link))
  })

  if (level === 2) {
    node.props = {
      color: 'rgba(255, 0, 0, 0.2)'
    }
  }

  return node
}

function convertServiceToNode(service: largeGraphLegacy.Service): model.RawNode {
  let node: model.RawNode = {
    id: service.name
  }
  if (service.name.startsWith('exchange')) {
    node.props = {
      kind: 'exchange',
      label: service.name.substring('exchange '.length)
    }
  }
  return node
}

function convertLinkToEdge(link: largeGraphLegacy.Link): model.RawEdge {
  return {
    sourceId: link.sourceName,
    targetId: link.targetName,
    props: {
      kind: link.communicationType
    }
  }
}
