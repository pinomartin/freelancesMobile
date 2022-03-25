import firestore from '@react-native-firebase/firestore';
const COLLECTION__NAME = 'Users';

const getUserByID = async (uid: string) => {
  const users = await firestore().collection(COLLECTION__NAME).doc(uid).get();
  const user = users.data();
  return user;
};

const addUserToDB = async (email: string, uid: string) => {
  try {
    await firestore()
      .collection(COLLECTION__NAME)
      .doc(email)
      .set({
        userName: email.split('@')[0],
        email: email,
        uid: uid,
      });
    
  } catch (error) {
    console.log('addUserToDB', error); 
  }
};



export {getUserByID, addUserToDB};
