import { Avatar, Link } from '@mui/material'
import {AddTask, Assignment, Home} from '@mui/icons-material';
import Nav from 'react-bootstrap/Nav';
import React from 'react'
import "./Style.css"
export default function Sidebar() {
  return (
    <>
      <div className='sidebar'>
        <Nav defaultActiveKey="/" className="flex-column">
          {/* <Avatar style={{ marginTop: "100px", marginLeft: "70px", width: "100px", height: "100px", borderStyle: "solid", borderColor: "white" }}></Avatar> */}
          <Nav.Link style={{marginTop:'200px'}} id='links' href="/"><Home style={{marginBottom:3}}/>&nbsp;Home</Nav.Link>
          <Nav.Link id='links' href="/view-task"><AddTask  style={{marginBottom:3}}/>&nbsp;View Task</Nav.Link>
          <Nav.Link id='links' href="/add-task"><Assignment style={{marginBottom:3}}/>&nbsp;Add Task</Nav.Link>
        </Nav>

      </div>
    </>
  )
}
