import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './Graph'

const container = document.getElementById('root')
const renderApp = () => ReactDOM.render(<App />, container)

renderApp()

/*if ((module as any).hot) {
  (module as any).hot.accept(renderApp)
}*/
