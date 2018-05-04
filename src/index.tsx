import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { SimpleGraph } from './SimpleGraph'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/simplegraph">Simple Graph</Link>
            </li>
          </ul>
          <hr />

          <Route path="/simplegraph" component={SimpleGraph} />
        </div>
      </Router>
    )
  }
}

const container = document.getElementById('root')
const renderApp = () => ReactDOM.render(<App />, container)

renderApp()

/*if ((module as any).hot) {
  (module as any).hot.accept(renderApp)
}*/
