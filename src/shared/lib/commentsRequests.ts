import { $api } from "shared/api";
import { ICommentCreate, ICommentEdit } from "shared/model/Types";

export const GetCommentsByPostId = async (id: number) => {
  return await $api.get(`/Comments/GetByPostId?postId=${id}`);
};

export const SendCreateCommentRequest = async (data: ICommentCreate) => {
  return await $api.post("/Comments/Create", data);
};

export const SendEditCommentsRequest = async (data: ICommentEdit) => {
  return await $api.put("/Comments/Create", data);
};

export const DeleteCommentById = async (id: number) => {
  return await $api.delete(`/Comments/DeleteById?id=${id}`);
};

export const DeleteCommentsByPostId = async (postId: number) => {
  return await $api.delete(`/Comments/DeleteByPostId?postId=${postId}`);
};

export const DeleteCommentsByUserId = async (userId: number) => {
  return await $api.delete(`/Comments/DeleteByUserId?userId=${userId}`);
};
