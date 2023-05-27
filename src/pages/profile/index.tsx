import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

import {
  fetchDepartments,
  fetchFaculties,
  setUser,
} from "app/store/slices/UserSlice";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";

import { $api } from "shared/api";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import { GetUserIdByCookies } from "shared/lib/getUserIdByCookies";
import MainContainer from "widgets/mainContainer";
import { DeleteMe, Logout } from "shared/lib/usersRequests";
import { DeleteCommentsByUserId } from "shared/lib/commentsRequests";

const GetUserById = async () => {
  return await $api.get(`/Users/Get?id=${GetUserIdByCookies()}`);
};

const SendChangeGroupRequest = async (data: {
  course: number;
  classroom: number | null;
}) => {
  return await $api.post("/Requests/SendChangeGroupRequest", data);
};

const fieldStyles = {
  borderRadius: "10px",
  border: "1px solid gray",
  p: "5px 10px",
};

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);
  const faculties = useAppSelector((store) => store.user.faculties.selects);
  const departments = useAppSelector((store) => store.user.departments.selects);

  const courseOptions = [0, 1, 2, 3, 4, 5];
  const [selectedCourse, setSelectedCourse] = useState<number>(0);
  const [selectedClassroom, setSelectedClassroom] = useState<number | null>(
    null
  );

  const userFaculty = faculties.filter(
    (item) => item.value === user.facultyId
  )[0];
  const userDepartment = departments.filter(
    (item) => item.value === user.departmentId
  )[0];

  useEffect(() => {
    dispatch(fetchFaculties());
    dispatch(fetchDepartments());
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const response = await GetUserById();
    dispatch(setUser(response.data));
  };

  const handleSubmit = async () => {
    const data = {
      course: selectedCourse,
      classroom: selectedClassroom,
    };

    const response = await SendChangeGroupRequest(data);
  };

  const handleDeleteAccount = (userId: number) => {
    DeleteMe();
    Logout();
    DeleteCommentsByUserId(userId);
  };

  return (
    <MainContainer>
      <Box
        mt={"-200px"}
        p={5}
        sx={{ border: "1px solid gray", borderRadius: "10px" }}
      >
        <List dense={false}>
          <ListItem>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Аты:</Typography>
              <Typography>{user.fullname}</Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Почта дареги:</Typography>
              <Typography>{user.email}</Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Курс:</Typography>
              <Typography>{user.course}</Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Факультет:</Typography>
              <Typography>
                {faculties.find((item) => item.value === user.facultyId)?.label}
              </Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Бөлүм:</Typography>
              <Typography>
                {
                  departments.find((item) => item.value === user.departmentId)
                    ?.label
                }
              </Typography>
            </Box>
          </ListItem>
        </List>
        <Box>
          <Typography variant="h5" gutterBottom>
            Курсту же бөлүмдү алмаштыруу
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-disabled-label">Курс</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedCourse}
              label="Курс"
              onChange={(e) => setSelectedCourse(+e.target.value)}
              sx={{ width: "100%" }}
              size="medium"
            >
              {courseOptions.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              type="number"
              disabled={selectedCourse !== 0}
              id="demo-select-small"
              value={selectedClassroom}
              label="Группа"
              onChange={(e) => setSelectedClassroom(+e.target.value)}
              sx={{ width: "100%" }}
              size="medium"
            />
          </FormControl>
          <Button
            sx={{ marginTop: "5px" }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            size="large"
          >
            Жөнөт
          </Button>
        </Box>
        <Box>
          <Typography>Аккаунтумду өчүр.</Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDeleteAccount(GetUserIdByCookies())}
          >
            Өчүр
          </Button>
        </Box>
      </Box>
    </MainContainer>
  );
};

export default ProfilePage;
