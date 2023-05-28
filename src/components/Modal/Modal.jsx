import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from "react-dom";
import css from './Modal.module.css'; 

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ imgSrc, closeModal }) =>  {
 
 const handleBackdropClick = (even) => {
    if (even.target === even.currentTarget) closeModal();
  };

 useEffect(() => {
  const handleCloseByEscape = even => {
    if (even.code === "Escape") closeModal();
  };

  window.addEventListener("keydown", handleCloseByEscape);

  return () => {
    window.removeEventListener("keydown", handleCloseByEscape);
  };
 }, [closeModal]);
  
 
    return createPortal(
      <div  className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
             <img src={imgSrc} alt={imgSrc}/>
        </div>
      </div>,
      modalRoot
    );
  }

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}
export default Modal;