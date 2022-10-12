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

// const updateUserProfilePhoto = async (userEmail:string, updatedImage:any) => {

//   try {
//       const imgRef = await storage.ref().child(userEmail).child('Profile Photo');
//       await imgRef.put(updatedImage);
//       const imgURL = await imgRef.getDownloadURL(); 

//       console.log(imgURL)

//       await db.collection("users").doc(userEmail).update({
//         profilePhotoURL: imgURL
//       });
//       return imgURL;

//   } catch (error) {
//       console.log(error, "No se pudo guardar nueva foto de perfil")
//   }

// };

const updateUserName = async (name:string, userEmail:string) => {
  try {
    await firestore().collection(COLLECTION__NAME).doc(userEmail).update({
      userName: name
    });

    return name;
    
  } catch (error) {
      console.log(error, "No se pudo actualizar el nombre de Usuario");
  }
}



export {getUserByID, addUserToDB, updateUserName};
