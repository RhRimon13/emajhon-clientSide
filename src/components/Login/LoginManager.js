import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";


export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
            // console.log(displayName, photoURL, email)
        })
        .catch(error => {
            // console.log(error);
            console.log(error.message);
        })
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            var token = result.credential.accessToken;
            var user = result.user;
            user.success = true;
            return user;
            // console.log('Fb user', user)
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.log(errorCode, errorMessage, email, credential)
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signedOutUser;
        })
    // console.log("sign Out");
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.success = true;
            newUserInfo.error = '';
            updateUserName(name)
            return newUserInfo;
            // Signed in 
            // var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.success = true;
            newUserInfo.error = '';
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('User Name Updated Successfully')
    }).catch(function (error) {
        console.log(error)
    });
}