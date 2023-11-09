import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { movieCollectionRef } from "../lib/firestore.collaction";

function AddMovies() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      return;
    }
    addDoc(movieCollectionRef, { name })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
    alert(name);
  };

  return (
    <div>
      <Container className="mt-5 col-md-6">
        <h2 className=" mb-4">Add Movies</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Movie Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Button type="submit">Add Movie</Button>
        </form>
      </Container>
    </div>
  );
}

export default AddMovies;
