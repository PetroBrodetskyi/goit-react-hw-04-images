import React from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import css from './Modal.module.css';

const ModalWindow = ({ isOpen, onClose, largeImageURL }) => {
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className={css.modal}
      style={{
        content: {
          margin: 'auto',
        },
      }}
      onAfterOpen={() => document.addEventListener('keydown', handleKeyDown)}
      onAfterClose={() => document.removeEventListener('keydown', handleKeyDown)}
    >
      <div className={css.overlay} onClick={handleBackDropClick}>
        <div className={css.modal}>
          <img className={css.imagemodal} src={largeImageURL} alt="" />
          <button className={css.closeButton} onClick={onClose}>
            <AiOutlineClose size={22} />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWindow;
