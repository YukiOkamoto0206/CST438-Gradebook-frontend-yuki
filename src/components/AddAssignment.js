import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../constants.js';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include'
//

class AddAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, name: '', dueDate: '', courseId: '' };
  }
  handleClick = () => {
    this.setState({ open: true });
  };
  onClose = () => {
    this.setState({ open: false, name: '', dueDate: '', courseId: '' });
  };

  addNewAssignment = () => {};

  nameOnChange = (e) => {
    this.setState({ name: e.target.value });
  };

  dueDateOnChange = (e) => {
    this.setState({ dueDate: e.target.value });
  };
  courseIdOnChange = (e) => {
    this.setState({ courseId: e.target.value });
  };
  addAssignment = () => {
    const token = Cookies.get('XSRF-TOKEN');
    fetch(
      `${SERVER_URL}/assignment?name=${this.state.name}&dueDate=${this.state.dueDate}&courseId=${this.state.courseId}`,
      {
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': token },
      }
    )
      .then((res) => {
        if (res.ok) {
          toast.success('A new Assignment has been added', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.log('A new Assignment has been added');
        } else {
          toast.error('Error, course not added', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error('Error Status =' + res.status);
        }
      })
      .catch((err) => {
        toast.error('Error, course not added', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.error(err);
      });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <Button
          component={Link}
          onClick={this.handleClick}
          // to={{ pathname: '/add-assignment', assignment: AddAssignment }}
          variant="outlined"
          color="primary"
          style={{ margin: 10 }}
        >
          Add New Assignment
        </Button>
        <Dialog onClose={this.onClose} open={open} fullWidth={'xl'}>
          <DialogTitle>Add New Assignment</DialogTitle>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              pb: 4,
              width: 'fit-content',
              height: 'fit-content',
            }}
          >
            <TextField
              id="name"
              label="Name"
              variant="standard"
              onChange={this.nameOnChange}
            />
            <TextField
              id="dueDate"
              label="Due Date"
              variant="standard"
              onChange={this.dueDateOnChange}
            />
            <TextField
              id="courseId"
              label="Course ID"
              variant="standard"
              onChange={this.courseIdOnChange}
            />
            <Button
              onClick={this.addAssignment}
              variant="outlined"
              color="primary"
              style={{ margin: 10 }}
            >
              Add
            </Button>
          </Box>
        </Dialog>
        <ToastContainer autoClose={1500} />
      </>
    );
  }
}

export default AddAssignment;
