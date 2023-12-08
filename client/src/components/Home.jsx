import React, { useState } from 'react'
import 'animate.css'
import './Style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactCardFlip from "react-card-flip";
import { TextField, InputAdornment, IconButton, Button, Divider, Paper, } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  })
  const [userInfo, setUserInfo] = useState({
    email: "",
  })
  const inputChange = (event) => {
    const { name, value } = event.target
    setUserInfo({ ...userInfo, [name]: value })
    setLoginInfo({ ...loginInfo, [name]: value })
  }
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const validateForm = () => {
    const newErrors = {};

    if (loginInfo.username.trim() === '') {
      newErrors.username = 'Username is required';
    } else if (loginInfo.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (loginInfo.password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (loginInfo.password.length < 3) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (userInfo.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(userInfo.email)) {
      newErrors.email = 'Invalid Email';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    return /[^\s]*@[a-z0-9.-]*/i.test(email);
  };

  const navigate = useNavigate()
  const toLogin = (e) => {
    e.preventDefault();
    const formCheck = validateForm();
    setIsSubmit(true)
    if (Object.keys(errors).length === 0 && formCheck) {
      axios.post(`http://localhost:4000/login/user-login`, loginInfo).then((response) => {
        console.log(response);
        if(response.data.role=='user'){
          localStorage.setItem('token',response.data.token)
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    navigate('/view-task')
  };
  const [flip, setFlip] = useState(false);
  const createAccount = (e) => {
    e.preventDefault();
    const formIsValid = validateForm();
    setIsSubmit(true)
    if (Object.keys(errors).length === 0 && formIsValid) {
      axios.post(`http://localhost:4000/register/user`, userInfo).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });
    }
    setFlip(!flip)
  }
  return (
    <>
      <div className='container-fluid' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
        <div><h1 class="animate__animated animate__fadeInLeft" id='heading'>TASKZEN</h1><br></br>
          <p class="animate__animated animate__fadeInLeft" id='para'>Navigating Your Productivity Journey..!</p>
        </div>
        <div>
          <div id='form' class="animate__animated animate__fadeInDown" >
            <ReactCardFlip isFlipped={flip} flipDirection="horizontal">

              {/* login-section */}

              <Paper elevation={3} className='form-box' style={{ width: "400px", marginTop: "100px", marginLeft: '50px' }}>
                <TextField onChange={inputChange} name='username' type='text' id="outlined-basic" InputProps={{ style: { borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "45px" } }} placeholder="username" variant="outlined" /><br></br>
                {errors.username && <p style={{ marginLeft: 50, marginTop: 10, color: "red" }}>{errors.username}</p>}
                <TextField onChange={inputChange} name='password' InputProps={{ style: { borderRadius: "30px", width: "300px", marginBottom: "20px", marginLeft: "45px" } }} placeholder="Password" variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && <p style={{ marginLeft: 50, marginTop: 10, color: "red" }}>{errors.password}</p>}
                <Button onClick={toLogin} variant="contained" style={{ borderRadius: "30px", marginBottom: "20px", width: "305px", backgroundColor: "#ff7a00", height: "50px", marginLeft: "45px" }}>LOGIN</Button>
                <Divider style={{}}>or</Divider>
                <Button onClick={() => setFlip(!flip)} variant="contained" style={{ borderRadius: "30px", marginBottom: "20px", width: "305px", backgroundColor: "#ff7a00", height: "50px", marginLeft: "45px" }}>CREATE ACCOUNT</Button>
              </Paper>

              {/* register-section */}

              <Paper elevation={3} style={{ width: "400px", marginTop: "100px", marginLeft: '50px' }}>
                <TextField onChange={inputChange} name='username' type='text' id="outlined-basic" InputProps={{ style: { borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "45px" } }} placeholder="username" variant="outlined" /><br></br>
                {errors.username && <p style={{ marginLeft: 50, marginTop: 10, color: "red" }}>{errors.username}</p>}
                <TextField onChange={inputChange} name='email' type='email' id="outlined-basic" InputProps={{ style: { borderRadius: "30px", marginBottom: "20px", marginTop: "20px", width: "300px", marginLeft: "45px" } }} placeholder="email" variant="outlined" /><br></br>
                {errors.email && <p style={{ marginLeft: 50, marginTop: 10, color: "red" }}>{errors.email}</p>}
                <TextField onChange={inputChange} name='password' InputProps={{ style: { borderRadius: "30px", width: "300px", marginBottom: "20px", marginLeft: "45px" } }} placeholder="Password" variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && <p style={{ marginLeft: 50, marginTop: 10, color: "red" }}>{errors.password}</p>}
                <Button onClick={createAccount} variant="contained" style={{ borderRadius: "30px", marginBottom: "20px", width: "305px", backgroundColor: "#ff7a00", height: "50px", marginLeft: "45px" }}>REGISTER</Button>
                <Divider style={{}}>or</Divider>
                <Button onClick={() => setFlip(!flip)} variant="contained" style={{ borderRadius: "30px", marginBottom: "20px", width: "305px", backgroundColor: "#ff7a00", height: "50px", marginLeft: "45px" }}>LOGIN</Button>
              </Paper>
            </ReactCardFlip>
          </div>
        </div>
      </div>
    </>
  )
}
