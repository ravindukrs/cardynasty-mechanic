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
    getUserByEmail: (email) => {
        return firestore().collection('users').where("email", "==", email).get().then((doc) => {
            if (doc.empty) {
                // return doc.data()
                console.log("So Such User")
                return null
            } else {
                // doc.data() will be undefined in this case
                console.log("Found user, ",doc.docs[0].data());
                return doc.docs[0].data()
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    },
    checkNIC: (nic) => {
        return firestore().collection('users').where("nic", "==", nic).get().then((doc) => {
            if (doc.empty) {
                // return doc.data()
                return true
            } else {
                // doc.data() will be undefined in this case
                return false
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    },
    checkMobile: (mobile) => {
        return firestore().collection('users').where("mobile", "==", mobile).get().then((doc) => {
            if (doc.empty) {
                // return doc.data()
                return true
            } else {
                // doc.data() will be undefined in this case
                return false
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
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
            setCurrentProfileSettings(doc.data())
        }).catch((error) => {
            console.log(error)
        });
    },

    //Add or Modify Shop Details
    updateShopDetails: (payload) => {
        return firestore().collection('shops').doc(`${payload.uid}`).set(payload, { merge: true }).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.log("Error updating document: ", error);
        })
    },

    //Get Last Service on a Vehicle
    getLastService: (regNumber) => {
        return firestore().collection('vehicles').doc(`${regNumber}`).collection('services').orderBy("serviceDate", "desc").get().then((querySnapshot) => {
            if (querySnapshot.docs[0].data()) {
                return querySnapshot.docs[0].data()
            } else {
                return null
            }
        }).catch((error) => {
            console.log("Error querying document: ", error);
            return null
        });
    },
    getRegisteredVehicle: (regNumber) => {
        console.log("In FB Function: ", regNumber)
        return firestore().collection('vehicles').doc(regNumber).get().then((doc) => {
            console.log("Outside IF")
            if (doc.exists) {
                console.log("Inside IF")
                console.log("Doc Exists ", doc.data())
                return doc.data()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return null
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    },

    getTransactionsOfMechanic: (uid, setTransactions) => {
        console.log("Start Transactions in Firebase Function")
        return firestore().collection('mechanic-transactions').where('mechanic', '==', uid).orderBy("stamp", "desc").get().then((querySnapshot) => {
            let transactions = []
            if (querySnapshot.docs[0].data()) {
                console.log("Got a Query Doc")
                querySnapshot.docs.forEach((doc) => {
                    transactions.push(doc.data())
                })
                setTransactions(transactions)
            } else {
                return null
            }
        }).catch((error) => {
            console.log("Error querying document: ", error);
            return null
        });
    },

    //Credit Functions
    addCreditToMechanic: (uid, value) => {
        return firestore().collection('shops').doc(uid).get().then((doc) => {
            if (doc.data().balance) {
                var total = value + doc.data().balance
                return firestore().collection('shops').doc(`${uid}`).update({balance: total})
            }else{
                return firestore().collection('shops').doc(`${uid}`).update({balance: value})
            }
        }).catch((error) => {
            console.log(error)
        });
    },

    addTransactionEntry: (payload) => {
        return firestore().collection('mechanic-transactions').doc(`${payload.stamp}-${payload.mechanic}`).set(payload)
    },

    updateBankDetails: (uid, payload) => {
        return firestore().collection('shops').doc(uid).get().then((doc) => {
            if (doc.data()) {
                console.log("Updating Bank Details")
                return firestore().collection('shops').doc(`${uid}`).update({bankDetails: payload})
            }
        }).catch((error) => {
            console.log(error)
        });
    },

    performWithdrawal: (uid, withdrawalAmount) => {
        return firestore().collection('shops').doc(uid).get().then((doc) => {
            if (doc.data().balance) {
                var total = doc.data().balance - withdrawalAmount
                return firestore().collection('shops').doc(`${uid}`).update({balance: total})
            }else{
                return 0
            }
        }).catch((error) => {
            console.log(error)
        });
    },
    //Get all services of a mechanic
    getServicesOfMechanic: (uid, setServices) => {
        return firestore().collectionGroup('services').get().then((querySnapshot) => {
            if (querySnapshot.docs[0].data()) {
                let serviceList = []
                querySnapshot.docs.forEach((doc) => {
                    if(doc.data().mechanic == uid && doc.data().approved == "accepted"){
                        serviceList.push(doc.data().services)
                    }
                })
               setServices(serviceList)
            } else {
                return null
            }
        }).catch((error) => {
            console.log("Error querying document: ", error);
            return null
        });
    },

}

export default Firebase;