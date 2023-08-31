import React, { useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import { auth, registerWithCredential, registerWithPhoneNumber } from "../../components/firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";

// const firebaseConfig = {
//   apiKey: 'your-api-key',
//   authDomain: 'your-auth-domain',
//   // ...other config options...
// };

// firebase.initializeApp(firebaseConfig);

function UserLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [user, loading] = useAuthState(auth);

  const handleSendCode = () => {
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to enter the verification code.
        // Store confirmationResult for later use.
      })
      .catch(error => {
        // Handle error
      });
  };

  const handleSignIn = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, verificationCode);
    firebase.auth().signInWithCredential(credential)
      .then(authUser => {
        // User signed in
        setUser(authUser);
      })
      .catch(error => {
        // Handle error
      });
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      <button onClick={()=>registerWithPhoneNumber(phoneNumber)}>Send Code</button>
      <input type="text" placeholder="Verification Code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
      <button onClick={()=>registerWithCredential(verificationCode)}>Sign In</button>
      {user && <div>User signed in: {user.phoneNumber}</div>}
    </div>
  );
}

export default UserLogin;
