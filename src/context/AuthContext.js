import { useContext, createContext, useEffect, useState } from 'react';
//authentication
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import auth from '~/firebase';
//storage
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [videoList, setVideoList] = useState([]);
  //authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      console.log('unsubscribe');
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    signOut(auth);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  //storage

  const storage = getStorage();

  const videoListRef = ref(storage, 'Videos/');
  useEffect(() => {
    listAll(videoListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((downloadUrl) => {
          setVideoList((prev) => [...prev, downloadUrl]);
        });
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, user, logOut, setVideoList, videoList }}>
      {children}
    </AuthContext.Provider>
  );
}

const UserAuth = () => {
  return useContext(AuthContext);
};

export { UserAuth };
export default AuthContextProvider;
