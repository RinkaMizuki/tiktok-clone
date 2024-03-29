import { useState } from 'react';
import { createPortal } from 'react-dom';
import { resetLogin, resetRegister } from '~/redux/authSlice';
import { useDispatch } from 'react-redux';
const useModal = (Modal) => {
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch();

  const handleHideModalForm = () => {
    setIsShowing(false);
  };
  const handleShowModalForm = () => {
    setIsShowing(true);
    dispatch(resetRegister());
    dispatch(resetLogin());
  };

  const ModalComponent = () => {
    return isShowing ? (
      createPortal(<Modal isShowing={isShowing} onHideModal={handleHideModalForm} />, document.body)
    ) : (
      <></>
    );
  };
  return [ModalComponent, handleShowModalForm];
};

export default useModal;
