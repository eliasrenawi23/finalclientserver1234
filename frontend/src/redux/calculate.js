
import React, { Fragment, useState } from "react";
import axios from 'axios';

const Calculate = ({ insurance }) => {
 
    const [data, setdata] = useState([]);

    var Savere = 'TBD';
    const FirstName = insurance.FirstName;
    const handleCalculate = async(e) => {
        console.log(" start Calculate");
        axios.post("http://insuranseserver.herokuapp.com/users/get_data", { FirstName })
            .then(response => {
                var res = JSON.parse(JSON.stringify(response.data));
                const carstatus = res.CarStatus;
                const rank = res.UserRank;
                console.log("carstatus", carstatus);
                setdata(res);


                if (carstatus == 'NoClaims') {
                    if (rank == 1) {
                        Savere = "LOW";
                    } else {
                        Savere = "High";
                    }
                }
                else if (carstatus == 'new_Driver') {
                    Savere = "Mid";
                }

                else if (carstatus == 'accident') {
                    Savere = "severe";
                }

            })
            .catch((error) => {
                console.log(error);
            })
        //window.location.href = "/dashboard";

    }
    if (insurance.Review == "Reviewed") {
        axios.post("http://insuranseserver.herokuapp.com/users/get_data", { FirstName })
        .then(response => {
            var res = JSON.parse(JSON.stringify(response.data));
            setdata(res);
        })
        .catch((error) => {
            console.log(error);
        })
        return (
            <Fragment>
                <button type="button" class="btn btn-secondary" data-toggle="modal" data-target={`#id${insurance.RequestNumber}`}> ... </button>

                <div class="modal" id={`id${insurance.RequestNumber}`}>
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4 class="modal-title">Modal Heading</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">

                                    <thead>
                                        <tr>
                                            <th>Insurance Company Fee</th>
                                            <th>Insurance Enable</th>
                                            <th>Date Of Enablement</th>
                                            <th>Car Status</th>
                                            <th>User Rank</th>
                                            <th>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{data.comfee}</td>
                                            <td>{data.insuranceEnable}</td>
                                            <td>{data.dateofEnblment}</td>
                                            <td>{data.CarStatus}</td>
                                            <td>{data.UserRank}</td>
                                            <td>{data.message}</td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    return (<button className="btn btn-success" onClick={handleCalculate}>Calculate</button>)



}

export default Calculate;

