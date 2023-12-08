import React from 'react'
import Sidebar from '../components/Sidebar'
import ViewTask from '../components/ViewTask'

export default function ViewTaskPg() {
  return (
    <>
    <div className='Container-fluid'>
        <Sidebar/>
        <ViewTask/>
    </div>
    </>
  )
}
