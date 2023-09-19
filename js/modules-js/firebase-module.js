// import {Customer} from "./customer-form-validate-modules-js";

export {app, db, get, ref, firstData, set, child, push, remove, Firebase, customerBase, customerStorage, teamBase, teamStorage, priceBase, exampleBase, priceStorage, mainAnalyticsBase}
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, child, get, set, push, onValue, remove, update} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getStorage, ref as stRef, uploadString, getDownloadURL, deleteObject, listAll } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyAF9iMIN3A-FJYkcKZbA-PVlADMns8Oa0Y",
    authDomain: "dasboard-bb88c.firebaseapp.com",
    databaseURL: "https://dasboard-bb88c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dasboard-bb88c",
    storageBucket: "dasboard-bb88c.appspot.com",
    messagingSenderId: "291924264953",
    appId: "1:291924264953:web:f64dfb60ecb513a5b5df28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

let firstData

class Firebase {
    constructor(directory) {
        this.directory = directory;
    }
    async readData() {
        try {
            const itemCountRef = ref(db, this.directory);
            const snapshot = await get(itemCountRef);
            const data = await snapshot.val();
            return Object.assign(data)
        } catch (err) {console.log(err)}
    }
    async getItemId() {
        try {
            const id = await push(child(ref(db), this.directory)).key;
            return id;
        } catch (err) {console.log(err)}
    }
    async addItemToDatabase(item, id) {
        try {
            await set(ref(db, this.directory + id), item);
        } catch (err) {console.log(err)}
    }
    async removeItem(id) {
        await remove(ref(db, `${this.directory}${id}`));
    }
    async readItemData() {
        try {
            const itemCountRef = ref(db, this.directory);
            const snapshot = await get(itemCountRef);
            const data = await snapshot.val();
            firstData = Object.assign(data)
        } catch (err) {console.log(err)}
    }
}

const customerBase = new Firebase('customer/');
const teamBase = new Firebase('team/');
const priceBase = new Firebase('price/');
const exampleBase = new Firebase('example/');
const mainAnalyticsBase = new Firebase('mainAnalytics/')


// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

class Storage {
    constructor(directory) {
        this.directory = directory;
    }

    async uploadItemImage(imageName, image) {
        try {
            const storageRef = stRef(storage, `${this.directory}${imageName}`)
            await uploadString(storageRef, image, 'data_url');
        } catch (err) {
            console.log(err)
        }
    }

    async getItemUrl(imageName) {
        try {
            const storageRef = stRef(storage, `${this.directory}${imageName}`)
            return await getDownloadURL(storageRef);
        } catch (err) {
            console.log(err)
        }
    }

    async deleteItemImage(imageName) {
        try {
            const storageRef = stRef(storage, `${this.directory}${imageName}`)
            await deleteObject(storageRef)
        } catch (err) {
            console.log(err)
        }
    }

    async getItemNames() {
        // Create a reference under which you want to list
        try {
            const listRef = stRef(storage, this.directory);

            const listArr = await listAll(listRef);

            let array = []
            listArr.items.forEach((itemRef) => {
                // All the items under listRef.
                array.push(itemRef.name)
            });
            return array
        } catch (err) {
            console.log(err)
        }
    }
}

const customerStorage = new Storage('customer/');
const teamStorage = new Storage('team/');
const priceStorage = new Storage('price/');
