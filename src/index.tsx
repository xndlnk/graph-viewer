import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './tachyons.css'
import './index.css'

import { simpleGraph } from './example-graphs/simpleGraph'
import { largeGraph } from './example-graphs/largeGraph'
import { GraphContainer } from './view/GraphContainer'

const linkStyling = 'link underline dim yellow'

const App = () => {
  return (
    <Router>
      <div className="sans-serif">
        <div className="bg-black white pa3">
          <ul className="list f3">
            <li><b>Simple:</b> <Link className={linkStyling} to="/graph/simple">Complete</Link></li>
            <li><b>Large:</b> <Link className={linkStyling} to="/graph/large">Complete</Link></li>
          </ul>
        </div>

        <div className="pa3">
          <Route exact path="/graph/simple"
            render={() => <GraphContainer initialGraph={simpleGraph} />}
          />
          <Route exact path="/graph/large"
            render={() => <GraphContainer initialGraph={largeGraph} />}
          />
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
