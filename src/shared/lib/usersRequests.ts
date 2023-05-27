import { $api } from "shared/api";
import { IUser } from "shared/model/Types";

type SigninUserType = Pick<IUser, "email" | "password">;
type SignupUserType = Omit<IUser, "id">;
type IPasswordReset = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export const SignIn = async (data: SigninUserType) => {
  return await $api.post("/Users/SignIn", data);
};

export const SignUp = async (data: SignupUserType) => {
  return await $api.post("/Users/SignUp", data);
};

export const SendConfirmationCode = async (data: { code: string }) => {
  return await $api.put("/Users/ConfirmEmail", data);
};

export const SendActivateUserRequest = async (email: string) => {
  return await $api.get(`/Users/Activate?email=${email}`);
};

export const SendPasswordResetRequest = async (data: IPasswordReset) => {
  return await $api.put("/Users/ResetPassword", data);
};

export const Logout = async () => {
  return await $api.get("/Users/LogOut");
};

export const GetUser = async (id: number) => {
  return await $api.get(`/Users/Get?id=${id}`);
};

export const DeleteMe = async () => {
  return await $api.delete("/Users/DeleteMe");
};
