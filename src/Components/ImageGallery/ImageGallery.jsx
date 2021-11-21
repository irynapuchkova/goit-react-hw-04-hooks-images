import PropTypes from 'prop-types';

import { ImageGalleryUl } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ data, onSelect }) {
  return (
    <>
      <ImageGalleryUl>
        {data.map(({ id, webformatURL, largeImageURL, tags }) => (
          <li key={id}>
            <ImageGalleryItem
              src={webformatURL || largeImageURL}
              alt={tags}
              onClick={() => onSelect(largeImageURL)}
            />
          </li>
        ))}
      </ImageGalleryUl>
    </>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
  onSelect: PropTypes.func,
};
