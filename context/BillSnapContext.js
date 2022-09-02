import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

export const BillSnapContext = createContext();

export const BillSnapProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [appStatus, setAppStatus] = useState("noloading");
  const [group, setGroup] = useState(null);
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    saveUser();
    getCurrentUser();
  }, [user]);

  const saveUser = () => {
    db.collection("users").doc(user?.uid).set({
      email: user?.email,
      displayName: user?.displayName,
      uid: user?.uid,
      photoURL: user?.photoURL,
    });
  };

  const getCurrentUser = () => {
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        setCurrentUser(doc.data());
      });
  };

  const getAllUsers = () => {
    db.collection("users")
      .get()
      .then((snapShot) => {
        setUsers(snapShot);
      });
  };

  return (
    <BillSnapContext.Provider
      value={{
        appStatus,
        loading,
        user,
        setAppStatus,
        group,
        setGroup,
        getAllUsers,
        users,
        currentUser,
      }}
    >
      {children}
    </BillSnapContext.Provider>
  );
};
