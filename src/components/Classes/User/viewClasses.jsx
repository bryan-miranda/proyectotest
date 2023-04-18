import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Classes = () => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "clases"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClases(data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <div className="col-md-8">
        <h1>Clases</h1>
      </div>
    </div>
  );
};

export default Classes;
