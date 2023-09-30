import { createContext } from 'react';
import { useModal } from '~/hooks';
import ModalForm from '~/components/Modal/ModalForm';
import ProfileModal from '~/components/Modal/ProfileModal';

export const ModalContext = createContext();

function ModalContextProvider({ children }) {
  const [ModalFormComponent, handleShowModalForm] = useModal(ModalForm);
  const [ModalProfileComponent, handleShowModelProfile] = useModal(ProfileModal);

  return (
    <ModalContext.Provider value={{ handleShowModalForm, handleShowModelProfile }}>
      {children}
      <ModalFormComponent />
      <ModalProfileComponent />
    </ModalContext.Provider>
  );
}
export default ModalContextProvider;
