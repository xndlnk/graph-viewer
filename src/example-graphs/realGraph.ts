import * as legacyGraph from './realGraphLegacy'
import * as model from '../domain/model'

export const systemNode: model.RawNode = convertLegacySystemToNode(legacyGraph.graph)

function convertLegacySystemToNode(system: legacyGraph.System): model.RawNode {
  let node: model.RawNode = {
    id: system.name
  }

  node.nodes = []
  system.services.forEach((service) => {
    node.nodes.push(convertServiceToNode(service))

    system.subSystems.forEach((subSystem) => {
      node.nodes.push(convertLegacySystemToNode(subSystem))
    })
  })

  node.edges = []
  system.links.forEach((link) => {
    node.edges.push(convertLinkToEdge(link))
  })

  return node
}

function convertServiceToNode(service: legacyGraph.Service): model.RawNode {
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

function convertLinkToEdge(link: legacyGraph.Link): model.RawEdge {
  return {
    sourceId: link.sourceName,
    targetId: link.targetName,
    props: {
      kind: link.communicationType
    }
  }
}
