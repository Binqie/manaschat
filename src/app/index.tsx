import Router from 'pages'
import { withProviders } from './providers'
import './styles/index.scss'

function App() {
  return (
      <div className='App'>
        <Router />
      </div>
  )
}

export default withProviders(App)