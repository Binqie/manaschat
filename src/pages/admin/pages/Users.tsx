import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetUsers } from "shared/lib/adminRequests";
import { SendActivateUserRequest, DeleteUser } from "shared/lib/usersRequests";
import { IUser } from "shared/model/Types";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    const response = await GetUsers();
    setUsers(response.data.filter((item: any) => !item.isActive));
    console.log("users", response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = async (id: number) => {
    const response = await DeleteUser(id);
    console.log("delete user", response);
    getUsers();
  };

  const handleActivateUser = async (email: string) => {
    const response = await SendActivateUserRequest(email);
    console.log("activate user", response);
    getUsers();
  };

  return (
    <div
      style={{
        padding: "5px 30px 20px",
        margin: "10px 40px 20px",
      }}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Classroom</TableCell>
              <TableCell align="right">Faculty Id</TableCell>
              <TableCell align="right">Department Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{user.id}</TableCell>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell align="center">{user.course}</TableCell>
                <TableCell align="center">{user.classroom}</TableCell>
                <TableCell align="center">{user.facultyId}</TableCell>
                <TableCell align="center">{user.departmentId}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleActivateUser(user.email)}
                  >
                    activate
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
