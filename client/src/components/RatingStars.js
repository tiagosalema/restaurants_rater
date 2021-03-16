import React from 'react';

const RatingStars = ({ stars }) => (
  <span className='ml-auto'>
    {[...Array(5)].map((e, i) => {
      let starStyle;
      if (i + 0.75 <= stars) starStyle = 's fa-star';
      else if (stars % 1 > 0.25 && i < stars) starStyle = 's fa-star-half-alt';
      else starStyle = 'r fa-star';
      return <i key={i} className={`text-warning fa${starStyle}`}></i>;
    })}
  </span>
);

export default RatingStars;
