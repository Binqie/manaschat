import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import logo from "shared/assets/logo.png";
import { List, ListItem, ListItemText } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        2023. All Rights Reserved.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "20px",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Box display={"flex"} justifyContent={"center"}>
          <CardMedia
            component="img"
            sx={{ width: 150, marginRight: "20px" }}
            image={logo}
            alt="Live from space album cover"
          />
          <List dense={true}>
            <ListItem>
              <ListItemText primary="+996 (312) 54 19 41-47" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Кампус им. Ч.Айтматова (Джал), 720038, Бишкек, Кыргызстан" />
            </ListItem>
            <ListItem>
              <ListItemText primary="info@manas.edu.kg" />
            </ListItem>
          </List>
        </Box>
        <Box marginTop={"10px"} textAlign={"center"}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
