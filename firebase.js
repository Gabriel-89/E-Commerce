"use strict"

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";

  import { 
     getFirestore,
     collection,
     getDocs,
     doc,
     getDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

  // Your web app's Firebase configuration

  const firebaseConfig = {

    apiKey: "AIzaSyCFsWQ16Yglo5Fx9uQwARgLT2Zd2FNH9Ak",
    authDomain: "cats-and-dogs-a7cc0.firebaseapp.com",
    projectId: "cats-and-dogs-a7cc0",
    storageBucket: "cats-and-dogs-a7cc0.appspot.com",
    messagingSenderId: "482330634896",
    appId: "1:482330634896:web:e2be2fbb4144909ed98615"
    
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  //Initialize Firestore

 const database = getFirestore(app);

export const getProducts = async () => {

    const querySnapshot = await getDocs(collection(database, "products"));

    return querySnapshot;

}

// Function to get a single product,
// used for button interaction (READ DOCUMENTATION...)

export const getProduct = async (id) => {

  const docRef = doc(database, "products", id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      return docSnap
  } else {
       console.log("No such document!");
  }


}

