import { createContext } from 'react';
import { useModal } from '~/hooks';
import ModalForm from '~/components/Modal/ModalForm';
import ProfileModal from '~/components/Modal/ProfileModal';

export const ModuleContext = createContext();

function ModalContextProvider({ children }) {
  const [ModalFormComponent, handleShowModalForm] = useModal(ModalForm);
  const [ModalProfileComponent, handleShowModelProfile] = useModal(ProfileModal);

  return (
    <ModuleContext.Provider value={{ handleShowModalForm, handleShowModelProfile }}>
      {children}
      <ModalFormComponent />
      <ModalProfileComponent />
    </ModuleContext.Provider>
  );
}
export default ModalContextProvider;
