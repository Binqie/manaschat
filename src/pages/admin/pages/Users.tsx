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
import { SendActivateUserRequest } from "shared/lib/usersRequests";
import { DeleteUser } from "shared/lib/adminRequests";
import { IUser } from "shared/model/Types";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    const response = await GetUsers();
    setUsers(response.data.filter((item: any) => !item.isActive));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = async (id: number) => {
    const response = await DeleteUser(id);
    getUsers();
  };

  const handleActivateUser = async (email: string) => {
    const response = await SendActivateUserRequest(email);
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
        Колдонуучуларды тастыктоо
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Курс</TableCell>
              <TableCell align="right">Группа</TableCell>
              <TableCell align="right">Факультет Id</TableCell>
              <TableCell align="right">Бөлүм Id</TableCell>
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
                    Тастыктоо
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Өчүрүү
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
