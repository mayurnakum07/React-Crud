import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { db } from "../lib/init-firebase";

function EditMovies() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || id === "") {
      return;
    }
    const docRef = doc(db, "movie", id);
    updateDoc(docRef, { name })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <Container className="mt-5 col-md-6">
        <h2 className=" mb-4">Edit Movies</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Movie Id</label>
          <input
            id="id"
            type="text"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <br />
          <label className="form-label">Movie Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Button type="submit">Update Movie</Button>
        </form>
      </Container>
    </div>
  );
}

export default EditMovies;
