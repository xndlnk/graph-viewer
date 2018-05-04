const simpleGraph = {
  nodes: [
    { id: 'a', color: 'red' },
    { id: 'b', color: 'blue' },
    { id: 'c', color: 'green' },
    { id: 'd', color: 'yellow' },
    { id: 'e', color: '#AEF023' }
  ],
  connections: [
    ['a', 'c'],
    ['a', 'e'],
    ['e', 'c'],
    ['a', 'd'],
    ['c', 'b'],
    ['d', 'b']
  ]
}

export simpleGraph
