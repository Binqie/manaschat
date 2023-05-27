import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

import { BASE_URL, PRIVATE_ROUTES, PUBLIC_ROUTES } from "shared/config/consts";
import { $api } from "shared/api";
import { useSelector } from "react-redux";
import { setAuthorized } from "app/store/slices/UserSlice";
import { useAppDispatch } from "shared/hooks";
import { IStore, IUser } from "shared/model/Types";
import Cookies from "js-cookie";

type ISigninUser = Pick<IUser, "email" | "password">;

export const SignIn = async (data: ISigninUser) => {
  return await $api.post("/Users/SignIn", data);
};

const Signin = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useSelector((store: IStore) => store.user.isAuthorized);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data: any) => {
    const userInfo: ISigninUser = {
      email: data.email,
      password: data.password,
    };
    const response = await SignIn(userInfo);
    if (response.status === 200) {
      dispatch(setAuthorized(true));
    }
  };

  if (isAuthorized || Cookies.get(".AspNetCore.Cookies")) {
    return <Navigate to={PRIVATE_ROUTES.HOME} />;
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://www.manas.edu.kg/images/bina/2.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "150px",
            maxWidth: 400,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Кирүү
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email почта"
              autoComplete="email"
              autoFocus
              size="small"
              {...(errors.email && {
                helperText:
                  "Сиздин почта 0000.00000@manas.edu.kg форматында болуусу керек",
              })}
              {...register("email", {
                required: true,
                pattern: new RegExp(/[0-9]+\.[0-9]+(@manas\.edu\.kg)$/gm),
              })}
            >
              <AiFillEyeInvisible />
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Сыр сөз"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Кирүү
            </Button>
            <Grid container gap={"10px"}>
              <Grid item xs>
                <Link to="/password/forgot">Сыр сөздү унуттуңузбу?</Link>
              </Grid>
              <Grid item>
                <Link to={PUBLIC_ROUTES.SIGNUP}>
                  {"Аккаунтуңуз жокбу? Катталыңыз."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signin;
