import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'tachyons/css/tachyons.css'
import './index.css'
import { SimpleGraph } from './view/SimpleGraph'
import { Graph } from './view/Graph'
import { FocusedNode } from './view/FocusedNode'
import { CollapsedNode } from './view/CollapsedNode'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { simpleGraph } from './example-graphs/simpleGraph'
import { largeGraph } from './example-graphs/largeGraph'

import styled from 'styled-components'

const SomeStyle = styled.div.attrs({
  className: 'link underline dim yellow'
})``

const darkLinkStyling = 'link underline dim yellow'

const App = () => {
  return (
    <Router>
      <div className="sans-serif">
        <div className="bg-black white f3">
          <ul className="list pa3">
            <li><b>Simple:</b> <Link className={darkLinkStyling} to="/graph/simple">Complete</Link>, <Link className={darkLinkStyling} to="/graph/simple/collapsed">Collapsed</Link></li>
            <li><b>Large:</b> <Link className={darkLinkStyling} to="/graph/large">Complete</Link>, <Link className={darkLinkStyling} to="/graph/large/collapsed">Collapsed</Link></li>
          </ul>
        </div>

        <div className="pa3">
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
