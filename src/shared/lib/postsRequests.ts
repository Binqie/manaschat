import { $api, $postApi } from "shared/api";
import { BASE_URL } from "shared/config/consts";
import { IElectionDetails, IPostCreate } from "shared/model/Types";

export const GetPosts = async () => {
  return await $api.get(`${BASE_URL}/Posts/GetPosts`);
};

export const GetPost = async (id: number) => {
  return await $api.get(`${BASE_URL}/Posts/Get`);
};

export const SendCreatePostRequest = async (data: IPostCreate) => {
  return await $postApi.post("/Posts/Create", data);
};

export const SendElectionPostDetails = async (data: IElectionDetails) => {
  return await $api.post("/Posts/CreateElectionPostDetail", data);
};

export const SendEditPostRequest = async (data: IPostCreate) => {
  return await $postApi.put("/Posts/Edit", data);
};

export const SendEditElectionPostDetails = async (data: IElectionDetails) => {
  return await $api.put("/Posts/EditElectionPostDetail", data);
};

export const DeletePostRequest = async (id: number) => {
  return await $api.delete(`/Posts/Delete?id=${id}`);
};
