import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../styles/PostImages.module.css';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState();

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  // 이미지가 1개일때
  if (images.length === 1) {
    return (
      <>
        <img
          // 굳이 누를 필요가 없다라는 것을 스크린리더에게 알려준다.
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {/* 이미지를 클릭하게 되면  showImagesZoom 이 True가 되고 이미지줌 컴포넌트를 */}
        {/* 실행하게 된다. */}
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  // 이미지가 2개일때
  if (images.length === 2) {
    return (
      <>
        <img
          className={styles.image}
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          className={styles.image}
          role="presentation"
          width="50%"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  // 이미지가 3개 이상일때
  return (
    <div>
      <img
        className={styles.image}
        role="presentation"
        src={images[0].src}
        alt={images[0].src}
        onClick={onZoom}
      />
      <div role="presentation" className={styles.showplus} onClick={onZoom}>
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더보기
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
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
