import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  RadioGroup,
  Box,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

import { PRIVATE_ROUTES } from "shared/config/consts";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import { GetUserIdByCookies } from "shared/lib/getUserIdByCookies";
import { DeletePostRequest, GetPost } from "shared/lib/postsRequests";
import { IComment, ICommentCreate, IPost } from "shared/model/Types";
import MainContainer from "widgets/mainContainer";
import { deletePost, setPost } from "app/store/slices/PostSlice";
import {
  DeleteCommentsByPostId,
  GetCommentsByPostId,
  SendCreateCommentRequest,
} from "shared/lib/commentsRequests";
import { addComment, setComments } from "app/store/slices/CommentSlice";
import CommentsGroup from "widgets/commentsGroup";

const Post = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);
  const postId = Number(useParams().postId) || -1;

  const [comment, setComment] = useState<string>("");

  const post = useAppSelector((store) => store.posts.currentPost);
  const comments = useAppSelector((store) => store.comments.comments);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePostDelete = async (postId: number) => {
    dispatch(deletePost(postId));
    const response = await DeletePostRequest(postId);
    const commentDelete = await DeleteCommentsByPostId(postId);
  };

  const handleSendComment = async () => {
    console.log(Date.now().toLocaleString())
    const data: ICommentCreate = {
      postId: post.id,
      text: comment,
    };

    const response = await SendCreateCommentRequest(data);
    const comm: IComment = {
      author: user,
      authorId: user.id,
      id: -1,
      createdAt: new Date().toISOString(),
      post: null,
      postId: postId,
      text: comment,
    };

    dispatch(addComment(comm));
  };

  const fetchPost = async () => {
    const post = await GetPost(+postId);
    const comments = await GetCommentsByPostId(+postId);
    dispatch(setPost(post.data));
    dispatch(setComments(comments.data));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <MainContainer>
      <Card sx={{ maxWidth: 650, width: "100%" }} variant="outlined">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post.authorFullname[0]}
            </Avatar>
          }
          action={
            GetUserIdByCookies() === (null || post.authorId) ? (
              <>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Link
                    to={`edit/${post.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem>Өзгөртүү</MenuItem>
                  </Link>
                  <MenuItem
                    onClick={() => handlePostDelete(post.id)}
                    style={{ color: "red" }}
                  >
                    Өчүрүү
                  </MenuItem>
                </Menu>
              </>
            ) : null
          }
          title={post.authorFullname}
          subheader={`${new Date(
            Date.parse(post.createdAt)
          ).toLocaleDateString()}`}
        />
        <CardMedia
          component="img"
          height="350"
          image={`data:image/png;base64, ${post.image}`}
        />
        <CardContent>
          <Typography variant="h5" color="text.primary">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {post.body}
          </Typography>
        </CardContent>
      </Card>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        marginTop={2}
        padding={"10px"}
        maxWidth={650}
        width={"100%"}
        borderRadius={"5px"}
        border="1px solid #cccccc"
      >
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginTop={2}
        >
          <TextField
            id="outlined-basic"
            label="Ой пикир калтыруу"
            variant="outlined"
            size="small"
            sx={{ width: "100%", marginRight: "20px" }}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendComment}
          >
            Жөнөт
          </Button>
        </Box>
        <CommentsGroup comments={comments} />
      </Box>
    </MainContainer>
  );
};

export default Post;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
