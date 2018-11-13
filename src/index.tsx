import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './tachyons.css'
import './index.css'
import { SimpleGraph } from './view/SimpleGraph'
import { Graph } from './view/Graph'
import { GraphLoader } from './view/GraphLoader'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import { simpleGraph } from './example-graphs/simpleGraph'
import { largeGraph } from './example-graphs/largeGraph'
import { GraphProviderWithFallback } from './graphProvider/graphProvider'
import { GraphFetcher } from './graphProvider/GraphFetcher'

const graphProvider = new GraphProviderWithFallback({}, new GraphFetcher(process.env.SYSTEM_PROVIDER_URL))

const SomeStyle = styled.div.attrs({
  className: 'link underline dim yellow'
})``

const darkLinkStyling = 'link underline dim yellow'

const App = () => {
  return (
    <Router>
      <div className="sans-serif">
        <div className="bg-black white pa3">
          <ul className="list f3">
            <li><b>Simple:</b> <Link className={darkLinkStyling} to="/graph/simple">Complete</Link></li>
            <li><b>Large:</b> <Link className={darkLinkStyling} to="/graph/large">Complete</Link></li>
            <li><b>External:</b> <Link className={darkLinkStyling} to="/graph/external">Complete</Link></li>
          </ul>
        </div>

        <div className="pa3">
          <Route exact path="/graph/simple" render={
            (props) => <Graph initialGraph={simpleGraph} />
          } />

          <Route exact path="/graph/large" render={
            (props) => <Graph initialGraph={largeGraph} />
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
