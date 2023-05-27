import Box from "@mui/material/Box";
import MainContainer from "widgets/mainContainer";
import { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import {
  SendCreatePostRequest,
  SendEditPostRequest,
  SendElectionPostDetails,
} from "shared/lib/postsRequests";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
} from "@mui/material";
import { BsFillTrashFill } from "react-icons/bs";
import { PostTypesEnum } from "shared/model/Types";
import FlexContainer from "widgets/flexContainer";
import { PostFormInputs as inputs } from "shared/model/Inputs";
import { Navigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "shared/config/consts";

export default function PostCreation() {
  const [postType, setPostType] = useState<string>("0");
  const [selectedImage, setSelectedImage] = useState();
  const [preview, setPreview] = useState<string>();
  const [variantsList, setVariantsList] = useState<string[]>([]);
  const [variant, setVariant] = useState<string>("");
  const [status, setStatus] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const onSelectImage = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    setSelectedImage(e.target.files[0]);
  };

  const handlePostTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostType((event.target as HTMLInputElement).value);
  };

  const addVariant = (): void => {
    if (variantsList.includes(variant)) return;
    const newList = [...variantsList, variant];
    setVariantsList(newList);
    setVariant("");
  };

  const removeVariant = (variant: string): void => {
    const newList = variantsList.filter((vt) => vt !== variant);
    setVariantsList(newList);
  };

  const onSubmit = async (data: FieldValues) => {
    const post = {
      body: data.body,
      title: data.title,
      image: selectedImage,
      type: +postType,
    };

    const response = await SendCreatePostRequest(post);
    setTimeout(() => setStatus(response.status), 2000);

    const electionPostDetails = {
      postId: response.data,
      variants: variantsList,
    };

    if (postType === "2") {
      const result = await SendElectionPostDetails(electionPostDetails);
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
              <img src={preview} id="previewImage" width="100%" height={200} />
            </div>
            <TextField
              onChange={(e) => onSelectImage(e)}
              id="selectedImage"
              type="file"
              size="small"
              style={{ margin: "5px 0", width: "100%" }}
            />
            {inputs.map((input, index) => (
              <TextField
                id={input.id}
                key={index}
                label={input.label}
                type={input.type}
                size="small"
                style={{ margin: "5px 0", width: "100%" }}
                {...register(input.name)}
              />
            ))}
            <FormControl component="fieldset">
              <FormLabel component="legend">Посттун түрү</FormLabel>
              <RadioGroup
                aria-label="type"
                name="type"
                value={postType}
                onChange={handlePostTypeChange}
              >
                <FormControlLabel
                  value={PostTypesEnum.COMMENT}
                  control={<Radio />}
                  label="Жөнөкөй"
                />
                <FormControlLabel
                  value={PostTypesEnum.SUGGESTION}
                  control={<Radio />}
                  label="Сунуш"
                />
                <FormControlLabel
                  value={PostTypesEnum.ELECTION}
                  control={<Radio />}
                  label="Шайлоо"
                />
              </RadioGroup>
            </FormControl>
            {postType === "2" && {
              ...(
                <FormControl style={{ width: "100%" }}>
                  <FormLabel>Variants</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {variantsList.map((variant, index) => (
                      <FlexContainer
                        key={index}
                        align="center"
                        justify="space-between"
                      >
                        <Typography variant="subtitle1">
                          {index + 1}. {variant}
                        </Typography>
                        <Button onClick={() => removeVariant(variant)}>
                          <BsFillTrashFill />
                        </Button>
                      </FlexContainer>
                    ))}
                  </RadioGroup>
                  <FlexContainer align="center" justify="space-between">
                    <TextField
                      size="small"
                      onChange={(event) => setVariant(event.target.value)}
                      value={variant}
                    />
                    <Button onClick={() => addVariant()}>Вариант кошуу</Button>
                  </FlexContainer>
                </FormControl>
              ),
            }}
            <Button variant="outlined" type="submit" style={{ marginTop: 10 }}>
              Жаратуу
            </Button>
          </FlexContainer>
        </form>
      </Box>
    </MainContainer>
  );
}
