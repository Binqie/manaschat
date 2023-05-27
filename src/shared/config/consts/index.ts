export const BASE_URL = "https://localhost:7289";

export const PUBLIC_ROUTES = {
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  CONFIRM: "/confirm",
  RESET_PASSWORD: "/password/forgot",
};

export const PRIVATE_ROUTES = {
  HOME: "/",
  POSTS: "/posts",
  POST: ":postId",
  POST_CREATION: "new",
  POST_EDITING: "edit",
  ADMIN: "/admin",
  PROFILE: "/profile",
};
