import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { currentUser, setCurrentUser } from "../../redux/Global";
import { logged, setLogged } from "../../redux/Global";
import { useHistory } from "react-router-dom";
import Calcsaver from "../../redux/Calcsaver";
import Review from "../../redux/reviewCalc";
import Calculate from "../../redux/calculate";

export default function DashboardPage({ match }) {
    let history = useHistory();
    const rememberme = localStorage.getItem('remeberme');
    const Logged = localStorage.getItem('logged1');


    const [insurances, setInsurances] = useState([]);

    if (rememberme == 'true' && Logged == 'true') {
        history.push("/");
    }
 {

        const getInsurances = async () => {
            axios.get("http://localhost:5000/users/get_insurance")
                .then(response => {
                    var res = JSON.parse(JSON.stringify(response.data));
                    console.dir(res);

                    setInsurances(res);

                })
                .catch((error) => {
                    console.log(error);
                })
        };

        useEffect(() => {
            getInsurances();

        }, []);
        return (
            <div >
                <div id="wrapper">
                    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="Dashboard">
                            <div class="sidebar-brand-icon rotate-n-15">
                                <i class="fas fa-laugh-wink"></i>
                            </div>
                            <div class="sidebar-brand-text mx-3">HAREL</div>
                        </a>

                        <hr class="sidebar-divider my-0" />
                        <li class="nav-item active">
                            <a class="nav-link" href="Dashboard">
                                <i class="fas fa-fw fa-table"></i>
                                <span>Dahsboard</span></a>
                        </li>

                        <hr class="sidebar-divider" />
                        <li class="nav-item active">
                            <a class="nav-link" href="new-insurance">
                                <i class="fas fa-fw fa-table"></i>
                                <span>New incurance</span></a>
                        </li>

                        <hr class="sidebar-divider" />


                        <li class="nav-item">

                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div class="bg-white py-2 collapse-inner rounded">


                                </div>
                            </div>
                        </li>

                        <li class="nav-item">

                            <li class="nav-item active">
                                <a class="nav-link">
                                    <i class="fas fa-user"></i>
                                    <span>Users</span></a>
                            </li>

                        </li>

                    </ul>

                    <div id="content-wrapper" class="d-flex flex-column">


                        <div id="content">
                            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                                    <i class="fa fa-bars"></i>
                                </button>
                                <ul class="navbar-nav ml-auto">
                                    <div class="topbar-divider d-none d-sm-block"></div>
                                    <li class="nav-item dropdown no-arrow">
                                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="mr-2 d-none d-lg-inline text-gray-600 small">Class</span>
                                            <img class="img-profile rounded-circle"
                                                src="img/undraw_profile.svg" />
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                            aria-labelledby="userDropdown">

                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Logout
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>SEVERITY</th>
                                        <th>CATEGORY</th>
                                        <th>NAME</th>
                                        <th>AMOUNT</th>
                                        <th>STATUS</th>
                                        <th>DUE DATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {insurances.map(insurance => (
                                        <tr key={insurance.RequestNumber}>
                                            <td><Calcsaver SEVERITY={insurance.SEVERITY} /></td>
                                            <td>Car Insurance</td>
                                            <td>{insurance.FirstName + " " + insurance.LastName}</td>
                                            <td>{insurance.amount + "$"}</td>
                                            <td><Review Review={insurance.Review} /></td>
                                            <td>{insurance.date}</td>
                                            <td><Calculate insurance={insurance} /></td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

                <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close" >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" type="button" data-dismiss="modal" >Cancel</button>
                                <a href="logout" class="btn btn-primary" type="button" >  Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );



    }
}


