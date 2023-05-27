import { List } from "@mui/material";
import { IComment } from "shared/model/Types";
import Comment from "components/comment";
import { $api } from "shared/api";
import { useEffect, useState } from "react";
import { DeleteCommentById } from "shared/lib/commentsRequests";
import { useAppDispatch } from "shared/hooks";
import { deleteComment } from "app/store/slices/CommentSlice";

const CommentsGroup = ({ comments }: { comments: IComment[] }) => {
  const dispatch = useAppDispatch();

  const handleDeleteComment = async (id: number) => {
    const response = await DeleteCommentById(id);
    dispatch(deleteComment(id));
  };

  return (
    <List sx={{ width: "100%" }}>
      {comments.map((comment: IComment, index) => (
        <Comment
          key={index}
          text={comment.text}
          author={comment.author.fullname}
          authorId={comment.authorId}
          date={comment.createdAt}
          deleteComment={() => handleDeleteComment(comment.id)}
        />
      ))}
    </List>
  );
};

export default CommentsGroup;
