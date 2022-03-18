import React from "react";
import ReactStars from "react-stars";

const Review = ({ coment }) => {
  return (
    <div className="card review">
      <div className="card-content">
        <p className="is-size-5	1.5rem has-text-left ">{coment.comentario}</p>
        <ReactStars
          count={5}
          value={coment.rating}
          size={24}
          color={"#ffd700"}
        />
      </div>
    </div>
  );
};

export default Review;
