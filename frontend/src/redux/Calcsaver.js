
import React from "react";

const Calcsaver = ({ SEVERITY }) => {
    console.log('Calcsaver',SEVERITY);


    if (SEVERITY == "LOW") {
        return (<div class="alert alert-primary" role="alert">LOW</div>)
    }
    else if (SEVERITY == "Mid") {
        return <div class="alert alert-secondary" role="alert"> Mid</div >
    }
    else if (SEVERITY == "High") {
        return <div class="alert alert-warning" role="alert"> High</div>
    }
    else if (SEVERITY == "severe") {
        return <div class="alert alert-danger" role="alert"> Sever</div>
    }
    return (<div class="alert alert-dark" role="alert">TBD </div>)
}


export default Calcsaver;