import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Box, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BiCommentAdd } from "react-icons/bi";

import { IPostProps, PostTypesEnum } from "shared/model/Types";
import { GetUserIdByCookies } from "shared/lib/getUserIdByCookies";
import { DeletePostRequest } from "shared/lib/postsRequests";
import { useAppDispatch } from "shared/hooks";
import { deletePost } from "app/store/slices/PostSlice";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BASE_URL, PRIVATE_ROUTES } from "shared/config/consts";
import { $api } from "shared/api";

import {
  DeleteElectionPostResult,
  DeleteSuggestionPostResult,
  IElectionPostResult,
  ISuggestionPostResult,
  SendEditSuggestionPostResult,
  SendElectionPostResult,
  SendSuggestionPostResult,
} from "shared/lib/postResultsRequests";

export default function Post({ post, fetchPosts }: IPostProps) {
  const dispatch = useAppDispatch();

  const [selectedElectionValue, setSelectedElectionValue] = useState<
    number | null
  >(
    post.electionPostDetailsList.filter(
      (item) =>
        item.id ===
        post.electionPostResultsList.filter(
          (item) => item.authorId === GetUserIdByCookies()
        )[0]?.electionPostDetailId
    )[0]?.id
  );

  const [selectedSuggestionValue, setSelectedSuggestionValue] = useState<
    boolean | null
  >(
    post.suggestionPostResultsList.filter(
      (item) =>
        item.id ===
        post.suggestionPostResultsList.filter(
          (item) => item.authorId === GetUserIdByCookies()
        )[0]?.id
    )[0]?.isAgree
  );
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
    fetchPosts();
  };

  const handleClearChoise = async () => {
    if (post.type === 1) {
      const id =
        post.suggestionPostResultsList.find(
          (item) => item.authorId === GetUserIdByCookies()
        )?.id || -1;
      const result = await DeleteSuggestionPostResult(id);
      setSelectedSuggestionValue(null);
    } else if (post.type === 2) {
      const id =
        post.electionPostResultsList.find(
          (item) => item.authorId === GetUserIdByCookies()
        )?.id || -1;
      const result = await DeleteElectionPostResult(id);
      setSelectedElectionValue(null);
    }
    fetchPosts();
  };

  const handleChangeChoise = async () => {
    const data = {
      id:
        post.suggestionPostResultsList.find(
          (item) => item.authorId === GetUserIdByCookies()
        )?.id || -1,
      isAgree: !selectedSuggestionValue,
    };

    const result = await SendEditSuggestionPostResult(data);
    fetchPosts();
    setSelectedSuggestionValue(data.isAgree);
  };

  const handlePostResultRequest = async () => {
    let data: IElectionPostResult | ISuggestionPostResult;

    if (post.type === 2) {
      data = {
        electionPostDetailId: selectedElectionValue || -1,
      };

      const result = await SendElectionPostResult(data);
    } else if (post.type === 1) {
      data = {
        postId: post.id,
        isAgree: selectedSuggestionValue || false,
      };

      const result = await SendSuggestionPostResult(data);
    }
    fetchPosts();
  };

  return (
    <Card sx={{ width: 350 }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.authorFullname[0]}
          </Avatar>
        }
        action={
          GetUserIdByCookies() === post.authorId ? (
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
                  to={`${PRIVATE_ROUTES.POST_EDITING}?id=${post.id}`}
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
                {post.type === 1 && (
                  <MenuItem
                    onClick={handleChangeChoise}
                    style={{ color: "red" }}
                  >
                    Менин тандоомду өзгөрт
                  </MenuItem>
                )}
                {(post.type === 1 || post.type === 2) && (
                  <MenuItem
                    onClick={handleClearChoise}
                    style={{ color: "red" }}
                  >
                    Менин тандоомду өчүр
                  </MenuItem>
                )}
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
        height="194"
        image={`data:image/png;base64, ${post.image}`}
      />
      <CardContent>
        <Typography variant="h5" color="text.primary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {post.body}
        </Typography>
        <FormControl style={{ width: "100%" }}>
          {post.type === 1 && (
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={selectedSuggestionValue}
              onChange={(e) => setSelectedSuggestionValue(!!e.target.value)}
              style={{ display: "flex" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Кошулам"
                />
                <Typography variant="body2" color="text.primary">
                  {
                    post.suggestionPostResultsList.filter(
                      (item) => item.isAgree
                    ).length
                  }
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Кошулбайм"
                />
                <Typography variant="body2" color="text.primary">
                  {
                    post.suggestionPostResultsList.filter(
                      (item) => !item.isAgree
                    ).length
                  }
                </Typography>
              </Box>
            </RadioGroup>
          )}
          {post.type === 2 && (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={selectedElectionValue}
            >
              {post.electionPostDetailsList.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value={item.id}
                    control={<Radio />}
                    label={item.variant}
                    onClick={() => setSelectedElectionValue(item.id)}
                  />
                  <Typography variant="body2" color="text.primary">
                    {
                      post.electionPostResultsList.filter(
                        (variant) => variant.electionPostDetailId === item.id
                      ).length
                    }
                  </Typography>
                </Box>
              ))}
            </RadioGroup>
          )}
          {post.type !== 0 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handlePostResultRequest}
              sx={{ marginBottom: 3 }}
            >
              Добуш берүү
            </Button>
          )}
        </FormControl>
        <Box>
          <Link to={`${post.id}`}>
            <BiCommentAdd size={28} />
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
