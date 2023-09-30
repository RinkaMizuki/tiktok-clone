import ModalContextProvider from './ModalContext';
import VideoContextProvider from './VideoContext';

function ContextProvider({ children }) {
  return (
    <ModalContextProvider>
      <VideoContextProvider>{children}</VideoContextProvider>
    </ModalContextProvider>
  );
}

export default ContextProvider;
