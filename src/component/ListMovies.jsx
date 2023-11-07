import {  getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { movieCollectionRef } from "../lib/firestore.collaction";

function ListMovies() {
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    console.log("ListOfMovie", listMovies);
  }, [listMovies]);

  const getMovie = () => {
    getDocs(movieCollectionRef)
      .then((response) => {
        const movie = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setListMovies(movie);
      })
      .catch((error) => console.log("EEE", error.message));
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <Container className="mt-5">
        <h2 className="text-center">List Movie</h2>
        <Button onClick={() => getMovie()}>Refresh list</Button>
        <ul>
          {listMovies.map((item) => (
            <li key={item.id}>
              {item.id} : {item.data.name}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default ListMovies;
