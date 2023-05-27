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

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "shared/config/consts";
import { $api } from "shared/api";
import { useState } from "react";

type IPasswordReset = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export const SendPasswordResetRequest = async (data: IPasswordReset) => {
  const response = await $api.put("/Users/ResetPassword", data);
  return response;
};

const ResetPassword = () => {
  const [resetPasswordStatus, setResetPasswordStatus] = useState<number>(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data: any) => {
    const userInfo: IPasswordReset = {
      email: data.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    const response = await SendPasswordResetRequest(userInfo);
    setResetPasswordStatus(response.status);
  };

  if (resetPasswordStatus === 200) {
    return <Navigate to={PUBLIC_ROUTES.SIGNIN} />;
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
          backgroundImage: "url(https://source.unsplash.com/random)",
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
            Сыр сөздү жаңыртүү
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
              label="Эски сыр сөз"
              type="password"
              id="old-password"
              autoComplete="current-password"
              size="small"
              {...register("oldPassword", { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Жаңы сыз сөз"
              type="password"
              id="new-password"
              autoComplete="current-password"
              size="small"
              {...register("newPassword", { required: true })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Жаңыртүү
            </Button>
            <Grid container gap={'10px'}>
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

export default ResetPassword;
