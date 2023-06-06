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
import { ICode } from "shared/model/Types";
import { useState } from "react";

export const SendConfirmationCode = async (data: ICode) => {
  const response = await $api.put("/Users/ConfirmEmail", data);
  return response;
};

const Confirm = () => {
  const [confirmationBody, setConfirmationBody] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data: any): Promise<void> => {
    data.code = +data.code;
    const response = await SendConfirmationCode(data);
    setConfirmationBody(response.data);
  };

  if (confirmationBody) {
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
          backgroundImage:
            "url(https://rezonans.kg/wp-content/uploads/2021/06/755-scaled.jpg)",
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
          <Typography component="h1" variant="h5" padding={7}>
            Код сиздин Email почтаңызга жөнөтүлдү. Кодду төмөндөгү формага
            жазыңыз.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              type="number"
              required
              fullWidth
              id="code"
              label="Код"
              autoComplete="code"
              autoFocus
              size="small"
              {...register("code", {
                required: true,
              })}
            >
              <AiFillEyeInvisible />
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Тастыктоо
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/password/forgot">Сыр сөздү унуттуңузбу?</Link>
              </Grid>
              <Grid item>
                <Link to={PUBLIC_ROUTES.SIGNIN}>{"Кирүү."}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Confirm;
