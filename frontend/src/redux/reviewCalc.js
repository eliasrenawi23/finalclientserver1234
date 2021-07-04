
import React from "react";

const Review = ({ Review }) => {
    console.log(Review);
    if (Review == "Reviewed" ) {
        return (<div class="alert alert-dark" role="alert">Reviewed </div>)
    }
    return (<div class="alert alert-dark" role="alert">IN Review</div>)
}


export default Review;