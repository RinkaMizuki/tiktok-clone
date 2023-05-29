import ModalContextProvider from "./ModalContext";

function ContextProvider({ children }) {
    return (
        <ModalContextProvider>{children}</ModalContextProvider>
    )
}

export default ContextProvider;