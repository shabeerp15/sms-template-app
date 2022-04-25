import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const MuiTable = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {props.headings.map((heading) => (
                <TableCell key={heading}>{heading}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.data?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{row._id.substring(0, 4)}...</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.message}</TableCell>
                <TableCell sx={{ "& > *": { mr: 2 } }}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate("/template", { state: { templateId: row._id } })
                    }>
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => props.handleDelete(row._id)}
                    color="error">
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`/message/${row._id}`)}>
                    Message
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MuiTable;
