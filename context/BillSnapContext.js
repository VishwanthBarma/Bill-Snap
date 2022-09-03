import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

export const BillSnapContext = createContext();

export const BillSnapProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [appStatus, setAppStatus] = useState("noloading");

  const [users, setUsers] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [group, setGroup] = useState(null);

  const [allInvolvedGroups, setAllInvolvedGroups] = useState(null);

  const [userCurrentGroupDetails, setUserCurrentGroupDetails] = useState(null);

  const [otherUserGroupDetails, setOtherUserGroupDetails] = useState(null);

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

  const getOtherUserGroupDetails = async (groupID) => {
    getCurrentGroupDetails(groupID);
    const data = group?.members.filter((item) => item.email != user.email);
    if (data) {
      setOtherUserGroupDetails(data);
    }
  };

  const updateUserMember = (amount) => {
    setUserCurrentGroupDetails((prev) => {
      const newAmount = prev.moneyToGive + amount;
      return [
        {
          displayName: prev.displayName,
          email: prev.email,
          giveTo: [],
          takeFrom: [],
          moneyToGet: newAmount,
          moneyToGive: prev.moneyToGive,
          photoURL: prev.photoURL,
          uid: prev.uid,
        },
      ];
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
        getCurrentGroupDetails,
        userCurrentGroupDetails,
        getUserCurrentGroupDetails,
        otherUserGroupDetails,
        getOtherUserGroupDetails,
        updateUserMember,
        getAllInvolvedGroups,
        allInvolvedGroups,
      }}
    >
      {children}
    </BillSnapContext.Provider>
  );
};
