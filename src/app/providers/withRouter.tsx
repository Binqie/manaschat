import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense
        fallback={<CircularProgress color="secondary" />}
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );