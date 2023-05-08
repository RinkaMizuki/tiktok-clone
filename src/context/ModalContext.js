import { createContext } from "react";
import { useModal } from "~/hooks";
import { ModalForm } from '~/components/Modal'
export const ModuleContext = createContext();

function ModuleContextProvider({ children }) {

    const [ModalFormComponent, handleShowModalForm] = useModal(ModalForm);

    return (
        <ModuleContext.Provider value={{ handleShowModalForm }}>
            {children}
            <ModalFormComponent />
        </ModuleContext.Provider>
    )
}
export default ModuleContextProvider;