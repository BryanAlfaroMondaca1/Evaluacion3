import { db } from "firebase/firestore";
import { doc, collection, addDoc, updateDoc, setDoc,deleteDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

export const editar = async (formulario) =>{
    const ref = doc ( db) 
    await updateDoc (ref,formulario)
}

export const eliminar = async (formulario) =>{
    const ref = doc ( db) 
    await deleteDoc (ref,formulario)
}
return; alert ("se ha eliminado el formulario")

export const agregar = async (formulario) =>{
    const ref = doc (db)
    await addDoc (db,formulario)
}