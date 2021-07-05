import React, { Component } from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logged, setLogged } from "../../redux/Global";

export default function LoginPage({ match }) {

    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(0);
    const [status, setStatus] = useState("");


    let history = useHistory();

    const rememberme = localStorage.getItem('remeberme');
    if(rememberme =='true'){
        history.push("/dashboard");
    }

    const validateLogin= async()=> {
        if(userEmail=="" || userPassword==""){
            setStatus("You Must fill all fields");
            return;
        }
        
        setStatus("Please Wait...");

            axios.post('http://insuranseserver.herokuapp.com/users/getuser',{email: userEmail, password: userPassword})

                .then(response => {
                var res= JSON.parse(JSON.stringify(response.data));

                console.log(userEmail,userPassword)

                if(res.Email!="" && res.Email == userEmail.toLowerCase()){
                    setStatus("Ok " + res.FirstName);
                    if(rememberMe){
                        localStorage.setItem('remeberme', 'true');
                        localStorage.setItem('email', res.Email);
                        localStorage.setItem('password', res.Password);
                    }
                    else{
                        localStorage.setItem('email', "");
                        localStorage.setItem('password', "");
                    }
                    setLogged(1);
                    localStorage.setItem('logged1', 'true');
                    window.location.href = 'Dashboard'
                }
                else
                    setStatus("Email Or Password are Incorrect");
                })
            .catch((error) => {
                setStatus("error: " +error)
            console.log(error);
            })



    }

    const handleEmailChange=(e)=> {
        setEmail(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    const handleRememberMeChange=(e)=>{
        setRememberMe(e.target.checked)
    }


    return (
        <div class="container">
                <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <p class="text-danger">{status}</p>
                                            </div>
                                            <div class="form-group">
                                                <input type="email" name="email" class="form-control form-control-user"
                                                    id="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    value={userEmail} onChange={handleEmailChange}/>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="password" class="form-control form-control-user"
                                                    id="password" placeholder="Password"
                                                    value={userPassword} onChange={handlePasswordChange}/>
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck" onChange={handleRememberMeChange}/>
                                                    <label class="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                      
                                            <button type="button" class="btn btn-primary btn-user btn-block" onClick={validateLogin}>
                                                Login
                                            </button>
                                            <hr/>
                                          
                                        </form>
                                        <hr/>
                                       
                                        <div class="text-center">
                                            <a class="small" href="sign-up">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
    
            </div>
    
        </div>

    );
}
