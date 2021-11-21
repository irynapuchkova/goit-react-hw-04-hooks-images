import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';
import { Overlay, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, children}) {
  useEffect(() => {
    const handleKeydown = (e) => {
        if (e.code === 'Escape') {
          onClose();
        }
    }
    window.addEventListener('keydown', handleKeydown)
    return (() =>
    window.removeEventListener('keydown', handleKeydown)
     )
  }, [onClose] )
    
  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

    return (createPortal(
      <Overlay onClick={handleBackdrop}>
        <ModalWrapper>{children}</ModalWrapper>
      </Overlay>,
      modalRoot,
    ));
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
