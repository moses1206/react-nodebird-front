import React from "react";
import PropTypes from "prop-types";

const PostImages = ({ images }) => {
  return (
    <div>
      <h2>구현중...</h2>
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
};

export default PostImages;