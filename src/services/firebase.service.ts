import { getAuth } from "firebase/auth"
import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore"


// const pageSize = 8
let gLastDocForPaging: Document | null = null;

interface Document {
  id: string
}

interface FilterOptions {
  byUserId?: string
}

declare global {
  interface Window {
    gaLogEvent?: (evName: string, value?: boolean) => void;
    myApp?: any; // Assuming myApp is a property you intend to use.
  }
}


export const firebaseService = {
  getDocuments,
  getDocument,
  addDocument,
  updateDocument,
  removeDocument,
  subscribe
}

async function getDb() {
  try {
    const db = getFirestore()
    console.log('getDb  db:', db)
    return db
  } catch (err) {
    console.error('Error connecting to db ', err)
    throw err
  }
}


async function addDocument(collectionName: string, document: any): Promise<any> {
  const db = await getDb()
  try {
    const docRef = await addDoc(collection(db, collectionName), document)
    // console.log('Doc saved. id: ', docRef.id)
    return docRef
  } catch (err) {
    console.error('Error adding document: ', err)
    throw err
  }
}

async function getDocument(collectionName: string, id: string): Promise<any | null> {
  const db = await getDb()
  const snap = await getDoc(doc(db, collectionName, id))
  if (!snap.exists()) {
    return null
  }
  const docToReturn = snap.data()
  docToReturn.id = id
  return docToReturn
}

async function updateDocument(collectionName: string, document: any, id: string): Promise<void> {
  const db = await getDb()
  // returns undefined
  await setDoc(doc(db, collectionName, id), document, { merge: true })
}

async function removeDocument(collectionName: string, id: string): Promise<void> {
  const db = await getDb()
  await deleteDoc(doc(db, collectionName, id))
}

async function getDocuments(collectionName: string, filterBy: FilterOptions): Promise<Document[]> {
  const db = await getDb();
  let collectionRef: CollectionReference<DocumentData, DocumentData> = collection(db, collectionName)

  if (filterBy.byUserId) {
    collectionRef = query(collectionRef, where('byUser.id', '==', filterBy.byUserId)) as CollectionReference<DocumentData, DocumentData>
  }

  const querySnapshot = await getDocs(collectionRef);
  gLastDocForPaging = querySnapshot.docs[querySnapshot.docs.length - 1];
  const docs: Document[] = [];
  querySnapshot.forEach((doc) => {
    docs.push({ id: doc.id, ...doc.data() } as Document);
  });
  return docs;
}


async function subscribe(collectionName: string, cb: (docs: Document[]) => void): Promise<() => void> {
  const db = await getDb()
  const unsub = onSnapshot(collection(db, collectionName), (querySnapshot) => {
    const docs: Document[] = [];
    console.log('Current data: ', querySnapshot.docs)
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
      docs.push({ id: doc.id, ...doc.data() })
    })
    cb(docs)
  })
  return unsub
}
