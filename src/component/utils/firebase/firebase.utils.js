import {initializeApp } from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
} from 'firebase/auth';

import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANbyxansbbZflPQ2cgUfmkd49H9wD-z3Q",
    authDomain: "clothingbrand-d3c00.firebaseapp.com",
    projectId: "clothingbrand-d3c00",
    storageBucket: "clothingbrand-d3c00.appspot.com",
    messagingSenderId: "987869328561",
    appId: "1:987869328561:web:4cdd99ab7a1c2221d4de90",
    measurementId: "G-JL0Q6H2NNS"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const signInWithGoogleRedirect =() => signInWithRedirect(auth,provider);

export const db = getFirestore();


export const addCollectionAndDocuments = async(collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async() =>{
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{});
    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth,additionalInformation = {}) => {
    const userDocRef = doc(db,'users',userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,email,createdAt,...additionalInformation
            });
        }catch(error){
            console.log('error creating the user',error.message);
        }
    }
    return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email,password) => {

    if(!email || !password)return;
    return await createUserWithEmailAndPassword(auth,email,password);
};


export const signInAuthUserWithEmailAndPassword = async(email,password)=>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async() => {
   await signOut(auth);
}

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth,callback);