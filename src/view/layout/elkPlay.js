const ELK = require('elkjs')
const elk = new ELK()

const graph = {
  id: 'root',
  layoutOptions: {
    'algorithm': 'layered',
    'layoutHierarchy': true
  },
  children: [
    {
      id: 'b1',
      width: 100,
      height: 100,
      children: [
        {
          id: 'c1', width: 30, height: 30
        }
      ]
    },
    { id: 'b2', width: 30, height: 30 }
  ],
  edges: [
    { id: 'e1', sources: [ 'c1' ], targets: [ 'b2' ] }
  ]
}

const graph2 = {
  id: 'root',
  layoutOptions: {
    'algorithm': 'layered',
    'layoutHierarchy': true
  },
  children: [
    { id: 'n1', width: 30, height: 30 },
    { id: 'n2', width: 30, height: 30 },
    { id: 'n3',
      width: 30,
      height: 30,
      children: [
      { id: 'x1', width: 10, height: 10 }
      ] }
  ],
  edges: [
    { id: 'e1', sources: [ 'n1' ], targets: [ 'n2' ] },
    { id: 'e2', sources: [ 'n1' ], targets: [ 'n3' ] },
    { id: 'e3', sources: ['n2'], targets: ['x1'] }
  ]
}

elk.layout(graph2)
   .then(result => console.log(JSON.stringify(result, null, 2)))
   .catch(error => console.error('ERROR: ' + error))
