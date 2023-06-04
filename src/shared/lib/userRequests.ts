import { $api } from "shared/api";
import { GetUserIdByCookies } from "./getUserIdByCookies";

export const GetUserById = async () => {
  return await $api.get(`/Users/Get?id=${GetUserIdByCookies()}`);
};
