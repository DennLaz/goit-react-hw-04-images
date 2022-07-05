import PropTypes from 'prop-types';

import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onClick, index }) => {
  return (
    <li className={styles.imageGalleryItem} onClick={() => onClick(index)}>
      <img className={styles.imageGalleryItemImage} src={src} alt={alt} />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  onClick: () => {},
  alt: 'Backup image',
  src: '',
  index: 0,
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
