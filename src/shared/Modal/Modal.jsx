// import { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({children, onClose}) {

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  function closeModal({ code, target, currentTarget }) {
    if (code === 'Escape' || target === currentTarget) {
      onClose();
    }
  };

  return createPortal(
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRoot
    );
}

Modal.defaultProps = {
  onClick: () => {},
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// class OldModal extends Component {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.closeModal);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeModal);
  // }

  // closeModal = ({ code, target, currentTarget }) => {
  //   if (code === 'Escape' || target === currentTarget) {
  //     this.props.onClose();
  //   }
  // };

  // render() {
  //   const { children } = this.props;
  //   const { closeModal } = this;
  //   // return createPortal(
    //   <div className={styles.overlay} onClick={closeModal}>
    //     <div className={styles.modal}>{children}</div>
    //   </div>,
    //   modalRoot
    // );
  // }
// }
