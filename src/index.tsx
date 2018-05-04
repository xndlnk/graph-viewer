import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { SimpleGraph } from './SimpleGraph'

const container = document.getElementById('root')
const renderApp = () => ReactDOM.render(<SimpleGraph />, container)

renderApp()

/*if ((module as any).hot) {
  (module as any).hot.accept(renderApp)
}*/
