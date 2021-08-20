import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import {
  TableRow,
  Typography,
  Toolbar,
  FormControl,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_NOTES } from "../Graphql/Queries";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";
import { CREATE_NOTE, DELETE_NOTE } from "../Graphql/Mutations";
import ConfirmDialog from "./ConfirmDialog";
interface Column {
  id: "id" | "description" | "time_created" | "owner" | "action";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columns: Column[] = [
  {
    id: "id",
    label: "Id",
    minWidth: 100,
    align: "center",
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "center",
  },
  { id: "time_created", label: "Time Created", minWidth: 100, align: "center" },
  {
    id: "owner",
    label: "Owner",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "70vh",
  },
  container: {
    maxHeight: 500,
  },
  title: {},
  formControl: {
    margin: theme.spacing(1),

    minWidth: 160,
    minHeight: 10,
  },
}));

export default function StickyHeadTable() {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [description, setDescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [noteToDelete, setNoteToDelete] = useState<any>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const result = useQuery(GET_ALL_NOTES);
  const notes = result.data?.getAllNotes;

  const [createNote, { loading }] = useMutation(CREATE_NOTE, {
    variables: {
      description: description,
      timestamp: new Date().toISOString().substring(0, 10),
    },
    refetchQueries: [
      {
        query: GET_ALL_NOTES,
      },
    ],
    update(_, result) {
      setDescription("");
    },
  });

  const [deleteNote, res] = useMutation(DELETE_NOTE, {
    refetchQueries: [
      {
        query: GET_ALL_NOTES,
      },
    ],
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreateNote = async () => {
    if (!loading) {
      try {
        await createNote();
      } catch (error) {}
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (!res.loading) {
      try {
        await deleteNote({ variables: { id: id } });
        handleClose();
      } catch (error) {}
    }
  };

  return (
    <Paper className={classes.root}>
      <ConfirmDialog
        id={noteToDelete}
        handleDelete={handleDeleteNote}
        open={open}
        handleClose={handleClose}
      />
      <Toolbar>
        <Grid item xs={12}>
          <Typography className={classes.title} color="inherit" variant="h4">
            Notes
          </Typography>
        </Grid>

        {user && (
          <>
            <FormControl className={classes.formControl}>
              <TextField
                label="Description"
                variant="outlined"
                placeholder="Enter Description"
                name="label"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                onClick={handleCreateNote}
                variant="outlined"
                size="large"
                color="primary"
              >
                Save
              </Button>
            </FormControl>
          </>
        )}
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {notes
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((note: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={note.id}>
                    <TableCell align="center">{note.id}</TableCell>
                    <TableCell align="center">{note.description}</TableCell>
                    <TableCell align="center">{note.timestamp}</TableCell>
                    <TableCell align="center">{note.user.name}</TableCell>
                    <TableCell align="center">
                      {+user?.id === +note.user.id ? (
                        <Button
                          onClick={() => {
                            handleClickOpen();
                            setNoteToDelete(note.id);
                          }}
                          variant="outlined"
                          color="secondary"
                        >
                          Delete
                        </Button>
                      ) : (
                        <Button variant="outlined" color="inherit">
                          Not Owned
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {notes && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={notes ? notes.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
