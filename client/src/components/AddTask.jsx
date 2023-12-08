import { Add, Delete, Edit } from '@mui/icons-material';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField, ToggleButton } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import 'animate.css'
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
export default function AddTask() {
  let counter = 0;
  const [taskDetails, settaskDetails] = useState([])
  const [updateTask, setupdateTask] = useState({
    name: '',
    description: '',
    status: '',
  })

  const showErrorAlert = (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops!!...',
      text: "Something went wrong re-check you internet connection",
    });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios.get("http://localhost:4000/task/view-task")
      .then((response) => {
        console.log(response);
        const details = response.data.details;
        settaskDetails(details)
      })
      .catch((error) => {
        showErrorAlert(error);
      });
  }, [])

  const [editedTask, setEditedTask] = useState({
    name: '',
    description: '',
    status: '',
  });
  const editTask = (task) => {
    setShow(true)
    setEditedTask(task);
    setEditedTask({
      id: task._id,
      name: task.name,
      description: task.description,
      status: task.status,
    });
  }
  const showAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Done!',
      text: 'Your Task is Updated!',
    });
  }
  const errorAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops!!..',
      text: 'Something went wrong re-check you internet connection',
    });
  }
  const submitChange = (id) => {
    axios.post(`http://localhost:4000/task/edit-task/${id}`, editedTask).then((response) => {
      console.log(response);
      showAlert();
    }).catch((error) => {
      console.error(error);
      errorAlert();
    });
  }
  const deleteAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Done!',
      text: 'Your Task is Removed!',
    });
  }

  const handleDelete = (id) => {
    axios.post(`http://localhost:4000/task/delete-task/${id}`).then((response) => {
      console.log(response);
      deleteAlert();
    }).catch((error) => {
      console.error(error);
      errorAlert();
    });
  }
  const [open, setOpen] = useState(false)
  const handleModel = () => setOpen(false);
  const [selected, setSelected] = useState(false);
  const [NewTask, setNewTask] = useState({
    name: '',
    description: '',
    status: '',
  })

  const inputChange = (event) => {
    const { name, value } = event.target
    setNewTask({ ...NewTask, [name]: value })
  }

  const newTask = () => {
    setOpen(true)
  }
  const taskAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Done!',
      text: 'Your Task is Added!',
    });
  }
  const submitNewTask = () => {
    axios.post(`http://localhost:4000/task/task-details`, NewTask).then((response) => {
      console.log(response);
      taskAlert();
    }).catch((error) => {
      console.error(error);
      errorAlert();
    });
  }

  return (
    <>
      <div id='add-task'>
        <Table style={{ marginLeft: '350px', marginTop: '50px', width: '800px', textAlign: 'center' }} striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {taskDetails.map(task => (
            <tbody>
              <tr>
                <td>{++counter}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td><ButtonGroup variant="Outlined" aria-label="outlined primary button group">
                  <Button onClick={() => { editTask(task) }} ><Edit /></Button>
                  <Button onClick={() => { handleDelete(task._id) }}><Delete /></Button>
                </ButtonGroup></td>
              </tr>
            </tbody>
          ))}
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Task Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField value={editedTask.name}
              onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })} label='Name' InputLabelProps={{
                style: {
                  marginLeft: "75px",
                  marginTop: "20px"
                }
              }} InputProps={{
                style: { borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "70px" }
              }}></TextField>

            <TextField value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} label='Description' InputLabelProps={{
                style: {
                  marginLeft: "75px",
                  marginTop: "20px",
                }
              }} InputProps={{
                style: { borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "70px" }
              }}></TextField>

            <FormControl sx={{ m: 1, minWidth: 120, borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "70px" }}>
              <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                label="Status"
              >
                <MenuItem style={{ color: 'green' }} value={"completed"}>completed</MenuItem>
                <MenuItem style={{ color: 'orange' }} value={"pending"}>pending</MenuItem>
              </Select>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { submitChange(editedTask.id) }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <ToggleButton className="animate__animated animate__heartBeat"
          style={{ right: '10px', bottom: '10px', backgroundColor: '#ff7a00', color: 'white',zIndex:2,position:'fixed' }}
          value="check"
          selected={selected}
          onClick={newTask}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          <Add />
        </ToggleButton>

        <Modal show={open} onHide={handleModel}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField name='name'
              onChange={inputChange} label='Name' InputLabelProps={{
                style: {
                  marginLeft: "75px",
                  marginTop: "20px"
                }
              }} InputProps={{
                style: { borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "70px" }
              }}></TextField>

            <TextField name='description'
              onChange={inputChange} label='Description' InputLabelProps={{
                style: {
                  marginLeft: "75px",
                  marginTop: "20px",
                }
              }} InputProps={{
                style: { borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "70px" }
              }}></TextField>

            <FormControl sx={{ m: 1, minWidth: 120, borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "70px" }}>
              <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name='status'
                onChange={inputChange}
                label="Status"
              >
                <MenuItem style={{ color: 'green' }} value={"completed"}>completed</MenuItem>
                <MenuItem style={{ color: 'orange' }} value={"pending"}>pending</MenuItem>
              </Select>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModel}>
              Close
            </Button>
            <Button variant="primary" onClick={submitNewTask}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  )
}
