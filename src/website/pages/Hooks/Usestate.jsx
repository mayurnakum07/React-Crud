import { useState } from "react";
import { Button } from "react-bootstrap";

function Usestate() {
  const [input, setInput] = useState([]);
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const addItem = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      alert("Please Fill the input !!");
      return;
    }

    setInput([
      ...input,
      {
        id: input.length,
        name: text,
      },
    ]);
    setText("");
  };

  const increment = () => {
    count >= input.length
      ? alert(
          "Your Above Todo list when length of todo when only when increment number."
        )
      : setCount((e) => e + 1);
  };
  const decrement = () => {
    count <= 0 ? alert("Decrement Limit 00") : setCount((e) => e - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setisSubmitting(true);
    setTimeout(() => {
      setisSubmitting(false);
      alert("Your Data is Submitted");
      // Clear form data after submission
      setFormData({
        name: "",
        email: "",
        pass: "",
      });
    }, 1000);
    console.log(formData);
  };

  const handleDelete = () => {
    setInput([]);
    setCount(0);
  };
  return (
    <div>   
      <h1 className="text-center mt-4">UseState Hook</h1>
      <div
        className={`container col-md-8 `}
        style={{
          padding: "40px 60px",
        }}
      >
        <h3>Todo List</h3>
        <form onSubmit={addItem}>
          <input
            name="input"
            placeholder="Type..."
            className="form-control mt-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="d-flex justify-content-end mt-2 gap-3">
            <h4>{input.length} Todos</h4>
            <Button onClick={handleDelete}>Reset Todos</Button>
          </div>
          <br />
          {input.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </form>
      </div>
      <br />
      <br />
      <div
        className={`container col-md-8 `}
        style={{
          padding: "40px 60px",
        }}
      >
        <h3>Counters</h3>
        <h3 className="mt-3">{count}</h3>
        <Button className="m-3" onClick={increment}>
          Increment
        </Button>
        <Button className="m-3" onClick={decrement}>
          Decrement
        </Button>
      </div>
      <br />
      <br />
      <div
        className={`container col-md-8 `}
        style={{
          padding: "40px 60px",
        }}
      >
        <h3>Form Validaiton</h3>
        <form className="mt-3" onSubmit={handleSubmit}>
          <label className="form-label">Name : -</label>
          <input
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <br />
          <label className="form-label">Email : -</label>
          <input
            className="form-control"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <br />
          <label className="form-label">Password : -</label>
          <input
            className="form-control"
            type="password"
            value={formData.pass}
            onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
            required
          />
          <br />
          <Button className="w-50 mb-3" type="submit">
            Sumbit
          </Button>
          <h5> {isSubmitting && "Submitting..."}</h5>
        </form>
        <br /> <br />
        <table className="table bg-light text-dark table-hover table-bordered ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData.name}</td>
              <td>{formData.email}</td>
              <td>{formData.pass}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usestate;
