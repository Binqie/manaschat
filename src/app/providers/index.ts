import { withRouter } from './withRouter'
import { withStore } from './withStore'

export const withProviders = (component: () => React.ReactNode) =>
  withRouter(withStore(component))
