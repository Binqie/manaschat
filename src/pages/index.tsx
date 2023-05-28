import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "shared/config/routes";
import { IRoute } from "shared/model/Types";
import { useAppSelector } from "shared/hooks";
import Signin from "./signin";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "shared/themes";
import { PRIVATE_ROUTES } from "shared/config/consts";
import Users from "./admin/pages/Users";
import Requests from "./admin/pages/Requests";
import Admin from "./admin";
import Home from "./home";
import Post from "./post";
import Posts from "./posts";
import PostCreation from "./postCreation";
import PostEdition from "./postEdition";
import ProfilePage from "./profile";
import Chat from "./chat";

const Router = () => {
  const isAuthorized = useAppSelector((store) => store.user.isAuthorized);
  const user = useAppSelector((store) => store.user.user);
  const theme = useAppSelector((store) => store.theme.theme);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Routes>
        {PublicRoutes.map(({ path, element }: IRoute) => (
          <Route key={path} path={path} element={element} />
        ))}
        {(isAuthorized || user.type === 2) && (
          <>
            <Route path={PRIVATE_ROUTES.CHAT} element={<Chat />} />
            <Route path={PRIVATE_ROUTES.HOME} element={<Home />} />
            <Route
              path={PRIVATE_ROUTES.PROFILE}
              element={<ProfilePage />}
            ></Route>
            <Route path={PRIVATE_ROUTES.POSTS}>
              <Route index element={<Posts />} />
              <Route path={PRIVATE_ROUTES.POST} element={<Post />} />
              <Route
                path={PRIVATE_ROUTES.POST_CREATION}
                element={<PostCreation />}
              />
              <Route
                path={PRIVATE_ROUTES.POST_EDITING}
                element={<PostEdition />}
              />
            </Route>
            <Route path={PRIVATE_ROUTES.ADMIN} element={<Admin />}>
              <Route index element={<Users />} />
              <Route path="requests" element={<Requests />} />
            </Route>
          </>
        )}
        <Route path="*" element={<Signin />} />
      </Routes>
    </ThemeProvider>
  );
};

export default Router;
