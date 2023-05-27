import Box from "@mui/material/Box";
import MainContainer from "widgets/mainContainer";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "shared/hooks";
import {
  TextField,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import {
  GetPost,
  SendEditPostRequest,
  SendEditElectionPostDetails,
} from "shared/lib/postsRequests";
import { IPost, IElectionDetailsEdit } from "shared/model/Types";
import FlexContainer from "widgets/flexContainer";
import { PRIVATE_ROUTES } from "shared/config/consts";

export default function PostEditing() {
  const [params, setParams] = useSearchParams();
  const postId = Number(params.get("id")) || -1;

  const [post, setPost] = useState<IPost>(
    useAppSelector((store) => store.posts.currentPost)
  );


  const [selectedImage, setSelectedImage] = useState();
  const [preview, setPreview] = useState<string>();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [variant, setVariant] = useState(
    post.electionPostDetailsList.find(
      (item) =>
        item.id === post.electionPostResultsList[0]?.electionPostDetailId
    )?.variant || ""
  );
  const [variantId, setVariantId] = useState(
    post.electionPostDetailsList[0]?.id || -1
  );
  const [newVariant, setNewVariant] = useState("");
  const [status, setStatus] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const fetchPost = async () => {
    const response = await GetPost(postId);
    setPost(response.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleVariantChange = (value: string) => {
    setVariant(value);
  };
  const handleVariantIdChange = (value: number) => {
    setVariantId(value);
  };

  const onSelectImage = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    setSelectedImage(e.target.files[0]);
  };

  const onSubmit = async (data: FieldValues) => {
    const postData = {
      id: post.id,
      body: body || post.body,
      title: title || post.title,
      image: selectedImage,
    };

    const response = await SendEditPostRequest(postData);
    setTimeout(() => setStatus(response.status), 2000);

    const electionPostDetails: IElectionDetailsEdit = {
      id: variantId,
      variant: newVariant,
    };


    if (post.type === 2) {
      const result = await SendEditElectionPostDetails(electionPostDetails);
    }
  };

  if (status === 200) {
    return <Navigate to={PRIVATE_ROUTES.HOME} />;
  }

  return (
    <MainContainer>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minWidth: 800,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexContainer direction="column" justify="center" align="stretch">
            <div style={{ width: "100%", height: "200px" }}>
              <img
                src={preview || `data:image/png;base64, ${post.image}`}
                id="previewImage"
                width="100%"
                height={200}
              />
            </div>
            <TextField
              required={true}
              onChange={(e) => onSelectImage(e)}
              id="selectedImage"
              type="file"
              size="small"
              style={{ margin: "5px 0", width: "100%" }}
            />
            <TextField
              id="title"
              label="Аталышы"
              type="text"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ margin: "5px 0", width: "100%" }}
            />
            <TextField
              id="body"
              label="Текст"
              type="text"
              size="small"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ margin: "5px 0", width: "100%" }}
            />
            {post.type === 2 && {
              ...(
                <FormControl style={{ width: "100%" }}>
                  <FlexContainer align="center" justify="space-between">
                    <Typography variant="subtitle1">
                      <InputLabel id="demo-simple-select-label">
                        Вариант
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={variant}
                        label="Вариант"
                        size="small"
                        sx={{ marginRight: 2, minWidth: "150px" }}
                      >
                        {post.electionPostDetailsList.map(
                          (item, index): any => (
                            <MenuItem
                              key={index}
                              value={item.variant}
                              onClick={() => {
                                handleVariantChange(item.variant);
                                handleVariantIdChange(item.id);
                              }}
                            >
                              {item.variant}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      <TextField
                        id="variant"
                        label="Вариант"
                        type="text"
                        size="small"
                        value={newVariant}
                        onChange={(e) => setNewVariant(e.target.value)}
                        style={{ margin: "5px 0", width: "100%" }}
                      />
                    </Typography>
                  </FlexContainer>
                </FormControl>
              ),
            }}
            <Button variant="outlined" type="submit" style={{ marginTop: 10 }}>
              Өзгөртүү
            </Button>
          </FlexContainer>
        </form>
      </Box>
    </MainContainer>
  );
}
