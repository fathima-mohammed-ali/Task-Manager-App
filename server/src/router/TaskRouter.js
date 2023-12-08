const express = require('express')
const taskModel = require('../model/TaskDetails')
const task = express.Router()

task.post('/task-details', async (req, res) => {
    try {
        const taskdetails = {
            name:req.body.name,
            description:req.body.description,
            status:req.body.status,
        }
        const saveTask = await taskModel(taskdetails).save()
        if (saveTask) {
            return res.status(200).json({
                success: true,
                error: false,
                details: saveTask,
                message: "Task is saved"
            })
        }
       
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Task not saved"
            })
        }
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: true,
            message: "something went wrong"
        })
    }
})
task.get('/view-task', async (req, res) => {
    try {
        const id = req.params._id
        const viewTask = await taskModel.find(id)
        if (viewTask) {
            return res.status(200).json({
                success: true,
                error: false,
                details: viewTask,
                message: "ready to view"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "can't view"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "something went wrong"
        })
    }
})
task.post('/edit-task/:_id', async (req, res) => {
    try {
        const {_id} = req.params
        console.log(_id);
        const { name,description,status } = req.body;
        const editedTask = await taskModel.updateOne({_id:_id },
            { $set: { name,description,status } }
        );
        console.log(editedTask);
        if (editedTask.modifiedCount === 1) {
            return res.status(200).json({
                success: true,
                error: false,
                details: editedTask,
                message: "Task edited"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Not edited"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "something went wrong"
        })
    }
})

task.post('/delete-task/:_id', async (req, res) => {
    try {
        const {_id} = req.params
        const deleteTask = await taskModel.deleteOne({_id:_id })
        if (deleteTask.deletedCount === 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Task deleted"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Task not deleted"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "something went wrong"
        })
    }
})
module.exports = task