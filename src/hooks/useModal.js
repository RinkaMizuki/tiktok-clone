import { useState } from "react";
import { createPortal } from 'react-dom'
const useModal = (Modal) => {
    const [isShowing, setIsShowing] = useState(true);

    const handleHideModalForm = () => {
        setIsShowing(false);
    }
    const handleShowModalForm = () => {
        setIsShowing(true);
    }

    const ModalComponent = () => {
        return (
            isShowing && createPortal(<Modal onHideModal={handleHideModalForm} />, document.body)
        )
    }
    return [ModalComponent, handleShowModalForm];
}

export default useModal;