# Tasks

- there is a reduced view
  - displays top-level nodes only
  - for each edge connecting top-level node a with second-level node b,
    an edge from node a to the parent of node b is added
- focussing a node which has no edges (sub-systems), displays also all the neighbour nodes of the node's contained nodes
- edges have arrows.
- the graph has a nice styling.
- a real graph with many nodes and edges is displayed.
- an alternative Webcola graph component is available (see http://ialab.it.monash.edu/webcola/)

- extract generic typescript graph library: graphts
- provides a clean and simple graph model with functions