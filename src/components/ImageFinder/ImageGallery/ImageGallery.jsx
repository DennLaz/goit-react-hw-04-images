import ImageGalleryItem from './ImageGalleryItem';

import PropTypes from 'prop-types';

import styles from './imageGallery.module.css';

const ImageGallery = ({ items, onClick }) => {
  const elemets = items.map((el, indx) => {
    const { id, webformatURL, tags } = el;
    return (
      <ImageGalleryItem
        onClick={onClick}
        index={indx}
        key={id}
        src={webformatURL}
        alt={tags}
      />
    );
  });
  return <ul className={styles.gallery}>{elemets}</ul>
};

ImageGallery.defaultProps = {
  items: [],
  onClick: ()=>{},
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
}

export default ImageGallery;
