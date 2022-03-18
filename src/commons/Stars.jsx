import ReactStars from "react-stars";
import React, { useContext } from "react";
import { StarsReviewContext } from "../context/starsReview";

const Stars = () => {
  const { setStars } = useContext(StarsReviewContext);
  const ratingChanged = (newRating) => {
    setStars(newRating);
  };
  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      color2={"#ffd700"}
    />
  );
};

export default Stars;
