import firestore from '@react-native-firebase/firestore';
import moment from 'moment'; 

const Firebase = {

    createNewUser: (userData) => {
        return firestore().collection('users').doc(`${userData.uid}`).set(userData)
    },
    //Add Service
    addNewService: (serviceData) => {
        return firestore().collection('vehicles').doc(`${serviceData.regNumber}`).collection('services').doc(`${moment().format()}`).set(serviceData)
    },

    //Get Constants
    getServiceTypes: () => {
        return firestore().collection('constants').doc('service-types').get().then((doc) => {
            if (doc.exists) {
                return doc.data()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    },

    getVehicleCategories: () => {
        return firestore().collection('constants').doc('vehicle-categories').get().then((doc) => {
            if (doc.exists) {
                return doc.data()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    },

    getProfileSettings: (uid, setCurrentProfileSettings) => {
        console.log("Inside Snapshot XXX")
        return firestore().collection('shops').doc(uid).onSnapshot((doc) => {
            console.log("Trying to Grab")
            console.log(doc.data().shop_name);
            setCurrentProfileSettings(doc.data())
        }).catch((error) => {
            console.log(error)
        });
    },

    //Add or Modify Shop Details
    updateShopDetails: (payload) => {
        console.log("Inside FB Method")
        return firestore().collection('shops').doc(`${payload.uid}`).set(payload, { merge: true }).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.log("Error updating document: ", error);
        })
    },

    //Get Last Service on a Vehicle
    getLastService: (regNumber) => {
        return firestore().collection('vehicles').doc(`${regNumber}`).collection('services').orderBy("serviceDate", "desc").get().then((querySnapshot) => {
           if (querySnapshot.docs[0].data()){
               return querySnapshot.docs[0].data()
           } else {
               return null
           }
        }).catch((error) => {
           console.log("Error querying document: ", error);
           return null
        });
    }
}

export default Firebase;