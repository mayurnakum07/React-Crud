import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { movieCollectionRef } from "../lib/firestore.collaction";

function RealtimeMovie() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const unscribe = onSnapshot(movieCollectionRef, (snapshot) => {
      setMovie(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      unscribe();
    };
  });
  return (
    <div>
      <h2>Realtime movies List</h2>
      <ul>
        {movie.map((item) => (
          <li key={item.id}>
            {item.id} : {item.data.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RealtimeMovie;
