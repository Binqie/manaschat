import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  GetRequests,
  SendExecuteChangeGroupRequest,
  SendDeleteChangeGroupRequest,
} from "shared/lib/adminRequests";
import { IRequest } from "shared/model/Types";

const Requests = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);

  const getRequests = async () => {
    const response = await GetRequests();
    setRequests(response.data);
    console.log("requests", response.data);
  };

  const handleAcceptRequest = async (id: number) => {
    const response = await SendExecuteChangeGroupRequest(id);
    console.log("accept request", response);
    getRequests();
  };

  const handleDeleteRequest = async (id: number) => {
    const response = await SendDeleteChangeGroupRequest(id);
    console.log("reject request", response);
    getRequests();
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div
      style={{
        padding: "5px 30px 20px",
        margin: "10px 40px 20px",
      }}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
        Колдонуучулардын өтүнүчтөрү
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>өтүнүч Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Жаңы курс</TableCell>
              <TableCell align="right">Жаңы бөлүм</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{req.id}</TableCell>
                <TableCell component="th" scope="row">
                  {req.email}
                </TableCell>
                <TableCell align="center">{req.course}</TableCell>
                <TableCell align="center">{req.classroom}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleAcceptRequest(req.id)}
                  >
                    Кабыл алуу
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteRequest(req.id)}
                  >
                    Четке кагуу
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

export default Requests;
