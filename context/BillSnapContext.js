import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const BillSnapContext = createContext();

export const BillSnapProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [appStatus, setAppStatus] = useState("noloading");

  const [users, setUsers] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [group, setGroup] = useState(null);

  const [allInvolvedGroups, setAllInvolvedGroups] = useState(null);

  const [userCurrentGroupDetails, setUserCurrentGroupDetails] = useState(null);

  const [currentGroupPayments, setCurrentGroupPayments] = useState(null);

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

  const getAllInvolvedGroups = () => {
    db.collection("groups")
      .where("involvedMembers", "array-contains", currentUser)
      .get()
      .then((querySnapshot) => {
        setAllInvolvedGroups(querySnapshot.docs);
      });
  };

  const getCurrentGroupDetails = async (groupID) => {
    const docRef = doc(db, "groups", groupID);
    const docSnap = await getDoc(docRef);
    setGroup(docSnap.data());
  };

  const getUserCurrentGroupDetails = (groupID) => {
    db.collection("groups")
      .doc(groupID)
      .collection("members")
      .where("email", "==", user?.email)
      .get()
      .then((querySnapshot) => {
        setUserCurrentGroupDetails(querySnapshot.docs[0].data());
      });
  };

  const getCurrentGroupPayments = (groupID) => {
    db.collection("groups")
      .doc(groupID)
      .collection("payments")
      .get()
      .then((payments) => {
        payments.forEach((item) => {});
        setCurrentGroupPayments(payments.docs);
      });
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
        getUserCurrentGroupDetails,
        getCurrentGroupDetails,
        userCurrentGroupDetails,
        getAllInvolvedGroups,
        allInvolvedGroups,
        getCurrentGroupPayments,
        currentGroupPayments,
      }}
    >
      {children}
    </BillSnapContext.Provider>
  );
};
