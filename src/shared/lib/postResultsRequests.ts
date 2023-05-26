import { $api } from "shared/api";

export interface IElectionPostResult {
  electionPostDetailId: number;
}
export interface ISuggestionPostResult {
  postId: number;
  isAgree: boolean;
}

export const SendElectionPostResult = async (
  data: IElectionPostResult
) => {
  return await $api.post("/PostResults/CreateElectionPostResult", data);
};

export const SendSuggestionPostResult = async (data: ISuggestionPostResult) => {
  return await $api.post("/PostResults/CreateSuggestionPostResult", data);
};

export const SendEditSuggestionPostResult = async (
  data: ISuggestionPostResult
) => {
  return await $api.post("/PostResults/EditSuggestionPostResult", data);
};

export const DeleteSuggestionPostResult = async (id: number) => {
  return await $api.delete(`/PostResults/DeleteSuggestionPostResult?id=${id}`);
};

export const DeleteElectionPostResult = async (id: number) => {
  return await $api.delete(`/PostResults/DeleteElectionPostResult?id=${id}`);
};
