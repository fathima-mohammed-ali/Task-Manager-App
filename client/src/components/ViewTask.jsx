import { Search } from '@mui/icons-material'
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import { Button, Divider, FormControl, IconButton, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react'
export default function ViewTask() {
    const SearchField = ({ onSearch }) => {
        const [searchQuery, setSearchQuery] = useState('');

        const handleInputChange = (e) => {
            setSearchQuery(e.target.value);
        };
    }
    const [taskDetails, settaskDetails] = useState({})
    const [filteredData, setfilteredData] = useState([])
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const showErrorAlert = (error) => {
        Swal.fire({
         icon: 'error',
          title: 'Oops!!...',
          text: "Something went wrong re-check you internet connection",
        });
     };
    useEffect(() => {
        axios.get("http://localhost:4000/task/view-task")
            .then((response) => {
                console.log(response);
                const details = response.data.details;
                settaskDetails(details)
                setfilteredData(details)
            })
            .catch((error) => {
                showErrorAlert(error);
            });
    }, [])
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };
    const filterSubmit = () => {
        if (filter === 'all') {
            setfilteredData(taskDetails);
        } else {
            const filtered = taskDetails.filter((task) => task.status === filter);
            setfilteredData(filtered);
        }
    };
    const sortByTitle = () => {
        const sortedData = [...filteredData];
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        setfilteredData(sortedData);
    };
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        const filteredTasks = taskDetails.filter(task => task.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setfilteredData(filteredTasks);
      };
     
    
    return (
        <>
            <div className='Container-fluid'>
                <Paper elevation={3} style={{ width: "700px", marginTop: "50px", marginLeft: "400px" }} >
                    <TextField placeholder='Search title' onChange={handleChange} InputProps={{
                        style: { borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "45px" }, endAdornment: (
                            <IconButton edge="end">
                                <Button onClick={sortByTitle} style={{ color: 'coral' }}><Search /></Button>
                            </IconButton>
                        ),
                    }}>
                    </TextField>
                    <FormControl variant="standard" style={{ width: "300px", marginLeft: "45px",marginTop:'20px' }}>
                        <Select
                            value={filter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            input={<Input label="Filter" />}
                            startAdornment={
                                <IconButton>
                                    <Button onClick={filterSubmit} style={{ color: 'coral' }}><FilterListTwoToneIcon /></Button>
                                </IconButton>
                            }
                            label="Filter"
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem style={{color:'green'}} value="completed">Completed</MenuItem>
                            <MenuItem style={{color:'orange'}} value="pending">Pending</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
            </div>
            <Divider style={{ marginTop: "20px" }} />
            <div>
                {filteredData.map(task => (
                    <Paper elevation={3} style={{ width: "700px", marginTop: "25px", marginLeft: "400px" }}>
                        <Card sx={{ minWidth: 275, fontFamily: 'Inconsolata,monospace' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                                    {task.name}
                                </Typography>
                                <Divider />
                                <Typography sx={{ fontSize: 18, paddingTop: '10px' }} variant="body2">
                                    {task.description}
                                </Typography>
                                {task.status === 'completed' ? (
                                    <Typography sx={{ paddingTop: '10px' }} variant='body3'>
                                        Status: <span style={{ color: 'green' }}>Completed</span>
                                    </Typography>
                                ) : (
                                    <Typography variant='body4'>
                                        Status:<span style={{ color: 'orange' }}> Pending</span>
                                    </Typography>
                                )}
                            </CardContent>


                        </Card>
                    </Paper>
                ))}
            </div>

        </>
    )
}
