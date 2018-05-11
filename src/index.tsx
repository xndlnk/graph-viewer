import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { SimpleGraph } from './view/SimpleGraph'
import { Graph } from './view/Graph'
import { FocusedNode } from './view/FocusedNode'
import { CollapsedNode } from './view/CollapsedNode'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { simpleGraph } from './example-graphs/simpleGraph'
import { largeGraph } from './example-graphs/largeGraph'

const App = () => {
  console.log(JSON.stringify(largeGraph, null, 2))

  return (
    <Router>
      <div>
        <p>
          Simple Graph: <Link to="/graph/simple">Complete</Link>, <Link to="/graph/simple/collapsed">Collapsed</Link>
        </p>
        <p>
          Large Graph: <Link to="/graph/large">Complete</Link>, <Link to="/graph/large/collapsed">Collapsed</Link>
        </p>
        <hr />

        <Route exact path="/graph/simple" component={SimpleGraph} />
        <Route path="/graph/simple/collapsed" render={
          (props) => <CollapsedNode node={simpleGraph} />
        } />
        <Route path="/graph/simple/focus/:nodeId" render={
          (props) => <FocusedNode graph={simpleGraph} focusedNodeId={props.match.params.nodeId} />
        } />

        <Route exact path="/graph/large" render={
          (props) => <Graph graph={largeGraph} />
        } />
        <Route path="/graph/large/collapsed" render={
          (props) => <CollapsedNode node={largeGraph} />
        } />
        <Route path="/graph/large/focus/:nodeId" render={
          (props) => <FocusedNode graph={largeGraph} focusedNodeId={props.match.params.nodeId} />
        } />
      </div>
    </Router>
  )
}

const container = document.getElementById('root')
const renderApp = () => ReactDOM.render(<App />, container)

renderApp()

/*if ((module as any).hot) {
  (module as any).hot.accept(renderApp)
}*/
