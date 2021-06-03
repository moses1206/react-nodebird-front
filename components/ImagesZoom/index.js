import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import styles from "../../styles/ImagesZoom.module.css";
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
    }
    .ant-card-cover {
        transform: none !important;
    }
`;

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div className={styles.overlay}>
      <header className={styles.header}>
        <h1 className={styles.title}>상세 이미지</h1>
        <button className={styles.closebtn} onClick={onClose}>
          X
        </button>
      </header>
      <div>
        <div className={styles.slickWrapper}>
          <Global />
          <Slick
            //   첫번째 슬라이드는 0번째꺼 그림을 불러오고
            initialSlide={0}
            // 넘길때마다 +1씩 증가된 값을 setCurrentSlide를 통해 변경해주고
            afterChange={(slide) => setCurrentSlide(slide)}
            // 가장마지막거 넘긴후에는 0번째꺼가 나오도록 만든다.
            infinite
            // 화살표는 지운다
            arrows={false}
            // 한번에 1개씩만 보이고
            slidesToShow={1}
            // 한번에 1개씩만 넘기도록
            slidesToScroll={1}
          >
            {images.map((v) => (
              <div className={styles.imgWrapper} key={v.src}>
                <img className={styles.img} src={v.src} alt={v.src} />
              </div>
            ))}
          </Slick>
          <div className={styles.indicator}>
            <div className={styles.indicatorWrapper}>
              {currentSlide + 1}
              {"  "} /{images.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
