// assets/js/promesas.js

import { db } from "./firebase.js";
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const registrarPersona = async (persona) => {
    await addDoc(collection(db, "personas"), persona);
};

export const obtenerPersonas = async () => {
    const ref = collection(db, "personas");
    const qSnap = await getDocs(ref);
    let listado = [];
    qSnap.forEach((doc) => {
        listado.push({ ...doc.data(), id: doc.id });
    });
    return listado;
};

export const actualizarPersona = async (objeto, id) => {
    const ref = doc(db, "personas", id);
    await updateDoc(ref, objeto);
};

export const eliminarPersona = async (id) => {
    const ref = doc(db, "personas", id);
    await deleteDoc(ref);
};
