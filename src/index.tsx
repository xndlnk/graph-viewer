import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { SimpleGraph } from './SimpleGraph'
import { FocusedNode } from './FocusedNode'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { simpleGraph } from './example-graphs/simpleGraph'

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/graph/simple">Simple Graph</Link>
          </li>
        </ul>
        <hr />

        <Route exact path="/graph/simple" component={SimpleGraph} />
        <Route path="/graph/simple/focus/:nodeId" render={
          (props) => <FocusedNode {...props} graph={simpleGraph} focusedNodeId={props.match.params.nodeId} />
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
