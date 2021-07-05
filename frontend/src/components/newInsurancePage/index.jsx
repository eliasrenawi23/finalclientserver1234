import React, { useState, useEffect, setState } from 'react'
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import FormCheckLabel from "../../redux/validateNI"





function NewInsurance(props) {

    const [status, setStatus] = useState("");

    const [isLoading, setLoading] = useState(false);
    const request_num = Math.floor(Math.random() * 100000) + 1;





    const state = {
        SocialNumber: "",
        fNam: "",
        lName: "",
        phone: "",
        email: "",
        insamount: "",
        prevComp: "Harel",
        prevNum: "",
        prevID: "",
        request_number: request_num.toString()
    };


    const handleSocialNumberChange = (e) => {
        state.SocialNumber = e.target.value;

    }
    const handlefNamChange = (e) => {
        state.fNam = e.target.value;

    }
    const handlelNameChange = (e) => {
        state.lName = e.target.value;

    }
    const handlephoneChange = (e) => {
        state.phone = e.target.value;

    }
    const handleEmailChange = (e) => {
        state.email = e.target.value;

    }
    const handleInsamountChange = (e) => {
        state.insamount = e.target.value;

    }
    const handleprevCompChange = (e) => {
        state.prevComp = e.target.value;
        console.log(state.prevComp);

    }
    const handleprevNumChange = (e) => {
        state.prevNum = e.target.value;

    }

    const handleprevIDChange = (e) => {
        state.prevID = e.target.value;

    }
    const handleSubmit = (e) => {
        console.log(request_num);
       
        localStorage.setItem("requestnum", state.request_number);


        const checkF = FormCheckLabel(state.SocialNumber,
            state.fNam,
            state.lName,
            state.phone,
            state.insamount,
            state.prevNum,
            state.prevID);

        setStatus(checkF);

        if ("All fields  correct sending to DB" === checkF) {
          

            console.log("starrting post new insurance");
            axios.post('http://insuranseserver.herokuapp.com:5000/users/add_insurance', {
                SocialNumber: state.SocialNumber,
                FirstName: state.fNam,
                Lastname: state.lName,
                Email: state.email,
                phone: state.phone,
                insuranceAmountRequested: state.insamount,
                PrevinsuranceCompanyName: state.prevComp,
                Previousinsurancenumber: state.prevNum,
                PrevinsuranceID: state.prevID,
                RequestNumber: state.request_number
            })
                .then(response => {
                    window.location.href = "/dashboard";


                })
                .catch((error) => {
                    console.log(error);
                })



        }

    }





    function simulateNetworkRequest() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }


    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <div >
            <div id="wrapper">
                <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="Dashboard">
                        <div class="sidebar-brand-icon rotate-n-15">
                            <i class="fas fa-laugh-wink"></i>
                        </div>
                        <div class="sidebar-brand-text mx-3">HAREL </div>
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
                            <span>new incurance</span></a>
                    </li>


                    <li class="nav-item">

                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div class="bg-white py-2 collapse-inner rounded">


                            </div>
                        </div>
                    </li>

                    <li class="nav-item">

                        <li class="nav-item active">
                            <a class="nav-link" href="tables.html">
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
                                <li class="nav-item dropdown no-arrow d-sm-none">
                                    <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-search fa-fw"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                        aria-labelledby="searchDropdown">
                                        <form class="form-inline mr-auto w-100 navbar-search">
                                            <div class="input-group">
                                                <input type="text" class="form-control bg-light border-0 small"
                                                    placeholder="Search for..." aria-label="Search"
                                                    aria-describedby="basic-addon2" />
                                                <div class="input-group-append">
                                                    <button class="btn btn-primary" type="button">
                                                        <i class="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>


                                <div class="topbar-divider d-none d-sm-block"></div>
                                <li class="nav-item dropdown no-arrow">
                                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="mr-2 d-none d-lg-inline text-gray-600 small">{"first name" + " " + "last name"}</span>
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
                        <div class="form-group">
                            <p class="text-danger">{status}</p>
                        </div>
                        <Container className='flex-column' id="all-in">
                            <Row className='flex-row'>
                                <Col>
                                    <InputGroup
                                        className="mb-3">
                                        <InputGroup.Text
                                            id="inputGroup-sizing-sm">
                                            Social Number
                                        </InputGroup.Text>
                                        <FormControl
                                            placeholder="305443524"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={handleSocialNumberChange}


                                        />
                                    </InputGroup>
                                    <InputGroup
                                        className="mb-3">
                                        <InputGroup.Text
                                            id="inputGroup-sizing-sm">
                                            First Name
                                        </InputGroup.Text>
                                        <FormControl
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={handlefNamChange}

                                        />
                                    </InputGroup>
                                    <InputGroup
                                        className="mb-3">
                                        <InputGroup.Text
                                            id="inputGroup-sizing-sm">
                                            Last Name
                                        </InputGroup.Text>
                                        <FormControl
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={handlelNameChange}

                                        />
                                    </InputGroup>
                                </Col>
                                <Col>

                                    <InputGroup
                                        className="mb-3">
                                        <InputGroup.Text
                                            id="basic-addon2">
                                            Phone Number#
                                        </InputGroup.Text>
                                        <FormControl
                                            placeholder="Phone Number"
                                            aria-label=" Phone Number#"
                                            aria-describedby="basic-addon2"
                                            onChange={handlephoneChange}

                                        />
                                    </InputGroup>
                                    <InputGroup
                                        className="mb-3">
                                        <InputGroup.Text
                                            id="basic-addon2">
                                            Email
                                        </InputGroup.Text>
                                        <FormControl
                                            placeholder="Email Address"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            onChange={handleEmailChange}

                                        />
                                    </InputGroup>
                                    <InputGroup
                                        className="mb-3">
                                        <InputGroup.Text
                                            id="inputGroup-sizing-sm">
                                            Insurance amount :
                                        </InputGroup.Text>
                                        <FormControl
                                            placeholder="$500"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={handleInsamountChange}

                                        />
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row className='insuranceDetail'>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Previous insurance company</Form.Label>
                                        <Form.Control as="select" onChange={handleprevCompChange}>
                                            <option value="Harel" selected>Harel</option>
                                            <option value="Migdal">Migdal</option>
                                            <option value="Yashir">Yashir</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <InputGroup
                                        className="mb-3">
                                        <InputGroup.Text
                                            id="basic-addon2">
                                            Previous insurance number:
                                        </InputGroup.Text>
                                        <FormControl
                                            placeholder="2435455"
                                            aria-label=" Previous insurance number"
                                            aria-describedby="basic-addon2"
                                            onChange={handleprevNumChange}

                                        />
                                    </InputGroup>
                                    <InputGroup
                                        className="mb-3">
                                        <InputGroup.Text
                                            id="basic-addon2">
                                            Previous insurance id:
                                        </InputGroup.Text>
                                        <FormControl
                                            placeholder="47789"
                                            aria-label=" Previous insurance id"
                                            aria-describedby="basic-addon2"
                                            onChange={handleprevIDChange}

                                        />
                                    </InputGroup>
                                </Col>

                            </Row>
                            <Button
                                variant="primary"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                herf="ThankYou"
                            >
                                {isLoading ? 'Loading…' : 'Send Request'}
                            </Button>
                        </Container>

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


    )
}


export default NewInsurance;