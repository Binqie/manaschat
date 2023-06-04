import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import Messages from "./messages";
import { TextInput } from "./textInput";

import { HubConnectionBuilder } from "@microsoft/signalr";
import { IUser } from "shared/model/Types";
import { setUser } from "app/store/slices/UserSlice";
import { GetUserById } from "shared/lib/userRequests";
import { $api } from "shared/api";

// const socket = io("http://localhost:4000");

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface IMessage {
  chatId: string;
  authorId: number;
  message: string;
}

interface IRecieveMessage {
  authorFullname: string;
  authorId: number;
  chatId: string;
  color: string;
  createdAt: string;
  id: number;
  message: string;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const GetChat = async (chatId: string) => {
  console.log("chatId", chatId);
  return await $api.get(`/Chats/GetChat?chatId=${chatId}`);
};

export default function Chat() {
  const dispatch = useAppDispatch();
  const user: IUser = useAppSelector((store) => store.user.user);

  const [connection, setConnection] = useState<any>();
  const [chat, setChat] = useState([]);
  const [chatId, setChatId] = useState<string>("");
  const latestChat: any = useRef(null);
  latestChat.current = chat;
  console.log(chat, chatId);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7289/hubs/chat")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
    getUserInfo();
    getChat();
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result: any) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message: IRecieveMessage) => {
            console.log("msg received", message);
            const updatedChat: any = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
          });
        })
        .catch((e: Error) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  useEffect(() => {
    getChat();
  }, [chatId]);

  const sendMessage = async (message: IMessage) => {
    if (connection) {
      try {
        await connection.send("SendMessage", message);
        getChat();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMessage = (m: string) => {
    const message: IMessage = {
      chatId:
        user.course === 0
          ? user.classroom?.toString()
          : `00${user.departmentId}${user.course}`,
      authorId: user.id,
      message: m,
    };

    sendMessage(message);
  };

  const getUserInfo = async () => {
    const user = await GetUserById();
    dispatch(setUser(user.data));
    setChatId(
      user.data.course === 0
        ? user.data.classroom?.toString()
        : `00${user.data.departmentId}${user.data.course}`
    );
    getChat();
  };

  const getChat = async () => {
    const response = await GetChat(chatId);
    setChat(response.data);
  };

  return (
    // <MainContainer>
    <Box
      sx={{
        display: "flex",
        minWidth: "100%",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Курбулашуу
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
      </Drawer>
      <Box
        component="main"
        sx={{
          position: "relative",
          minHeight: "100%",
          flexGrow: 1,
          p: 3,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "100%",
            maxHeight: 800,
            overflow: "scroll",
            padding: "20px 10px 20px 0",
          }}
        >
          <Messages messages={chat} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 5,
            left: 5,
            right: 5,
            backgroundColor: "#f2f2f2",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextInput sendMessage={handleMessage} />
        </Box>
      </Box>
    </Box>
    // </MainContainer>
  );
}
