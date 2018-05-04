import * as legacyGraph from './realGraphLegacy'
import * as model from '../model'

export const systemNode: model.Node = {
  id: legacyGraph.graph.name
}

addServicesAsNodes(legacyGraph.graph, systemNode)

function addServicesAsNodes(inGraph: legacyGraph.System, outNode: model.Node) {
  outNode.nodes = []
  inGraph.services.forEach((service) => {
    let node: model.Node = {
      id: service.name,
      label: service.name
    }
    if (service.name.startsWith('exchange')) {
      node.kind = 'exchange'
      node.label = service.name.substring('exchange '.length)
    }
    outNode.nodes.push(node)

    inGraph.subSystems.forEach((subSystem) => {
      let subSystemNode: model.Node = {
        id: subSystem.name,
        label: subSystem.name
      }
      outNode.nodes.push(subSystemNode)

      addServicesAsNodes(subSystem, subSystemNode)
    })
  })
}

console.log(JSON.stringify(systemNode, null, 2))
