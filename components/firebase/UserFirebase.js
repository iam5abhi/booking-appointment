import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  updatePassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
        apiKey: "AIzaSyDyk_rDxEUGnS98vI8K-s6LEfJQFJKsg2s",
        authDomain: "user-property-955b4.firebaseapp.com",
        projectId: "user-property-955b4",
        storageBucket: "user-property-955b4.appspot.com",
        messagingSenderId: "267098964139",
        appId: "1:267098964139:web:232255884797f7a5ed37ee",
        measurementId: "G-GGEGPPRL6N",
    };
    return initializeApp(firebaseConfig,"user-property");
  }
}

const app = initializeAppIfNecessary();
const userAuth = getAuth(app);
const db = getFirestore(app);

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(userAuth, email);
    alert("Password reset link sent!");

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const UpdatePassword = async (newPassword) => {
  const user = userAuth.currentUser;
  updatePassword(user, newPassword).then(() => {
    alert("Update Password Successfully")
    logout()
  }).catch((error) => {
    console.log(error,"error")
   alert("Something Want Wrong")
  });
  
}

const logout = () => {
   signOut(userAuth);
};

export {
  userAuth,
  db,
  UpdatePassword,
  sendPasswordReset,
  logout,
};