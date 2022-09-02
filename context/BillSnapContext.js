import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, where } from "firebase/firestore";

export const BillSnapContext = createContext();

export const BillSnapProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [appStatus, setAppStatus] = useState("noloading");
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [group, setGroup] = useState(null);
  const [userCurrentGroupDetails, setUserCurrentGroupDetails] = useState(null);

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
      moneyToGet: 0,
      moneyToGive: 0,
      takeFrom: [],
      giveTo: [],
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

  const getCurrentGroupDetails = async (groupID) => {
    const docRef = doc(db, "groups", groupID);
    const docSnap = await getDoc(docRef);
    setGroup(docSnap.data());
  };

  const getUserCurrentGroupDetails = async (groupID) => {
    getCurrentGroupDetails(groupID);
    setUserCurrentGroupDetails(group);
  };

  return (
    <BillSnapContext.Provider
      value={{
        appStatus,
        loading,
        user,
        setAppStatus,
        getAllUsers,
        users,
        currentUser,
        group,
        getCurrentGroupDetails,
        userCurrentGroupDetails,
        getUserCurrentGroupDetails,
      }}
    >
      {children}
    </BillSnapContext.Provider>
  );
};
