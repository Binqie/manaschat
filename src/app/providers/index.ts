import { withRouter } from "./withRouter";
import { withTheme } from "./withTheme";
import { withStore } from "./withStore";

export const withProviders = (component: () => React.ReactNode) => withRouter(withTheme(withStore(component)))