import React, { useState } from 'react'
import { useEffect } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";



function MainPage() {
    const [data, setData] = useState({});
    /*
        Esto es solo de prueba para probar que Google Firebase está funcionando correctamente, lo que hace es llamar a una coleccion 

        Video de guia     https://www.youtube.com/watch?v=KH9UkT-OnuQ 

        Si lo corren deberían de ver en consola de su navegador que se imprimió esto
        {id: '8da2JbDOZqzXdBoi4Taj', variablePrueba: 'Prueba de String'}
    */
    useEffect (() => {
        const querydb = getFirestore();
        const queryDoc = doc(querydb, 'prueba', '8da2JbDOZqzXdBoi4Taj');
        getDoc(queryDoc)
        .then(res => console.log({id:res.id, ...res.data()}))
    }, []) 


    return (
        <div className='main'>
            <h1>Prueba De titulo</h1>
        </div>
    )

}

export default MainPage