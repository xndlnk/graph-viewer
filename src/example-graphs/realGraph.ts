import * as legacyGraph from './realGraphLegacy'
import * as model from '../model'

export const systemNode: model.Node = convertLegacySystemToNode(legacyGraph.graph)

function convertLegacySystemToNode(system: legacyGraph.System): model.Node {
  let node: model.Node = {
    id: system.name,
    label: system.name
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

function convertServiceToNode(service: legacyGraph.Service): model.Node {
  let node: model.Node = {
    id: service.name,
    label: service.name
  }
  if (service.name.startsWith('exchange')) {
    node.kind = 'exchange'
    node.label = service.name.substring('exchange '.length)
  }
  return node
}

function convertLinkToEdge(link: legacyGraph.Link): model.Edge {
  return {
    sourceNode: link.sourceName,
    targetNode: link.targetName,
    kind: link.communicationType
  }
}
