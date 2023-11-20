import { useReducer } from "react";
import { Button } from "react-bootstrap";

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case "add":
      return state + 1;
    case "sub":
      return state - 1;
    case "reset":
      return 0;
    default:
      throw new Error("Unexpected  actions");
  }
};

const colorReducer = (state, action) => {
  switch (action.type) {
    case "updateColor":
      return action.payload;
    default:
      return state;
  }
};
function Usereducer() {
  const [count, dispatch] = useReducer(reducer, initialState);
  const [color, patch] = useReducer(colorReducer, "black");

  const handleChoose = (e) => {
    patch({ type: "updateColor", payload: e.target.value });
  };

  return (
    <div>
      <div className="App mt-3">
        <h1>UseReducer </h1>
        <hr className="mb-4" />
        <div
          className={` container col-md-8 `}
          style={{
            padding: "40px 60px",
          }}
        >
          <h3>Count and Clear</h3>
          <h3>{count}</h3>

          <Button className="m-2" onClick={() => dispatch("add")}>
            Add
          </Button>
          <Button className="m-2" onClick={() => dispatch("sub")}>
            Substact
          </Button>
          <Button className="m-2" onClick={() => dispatch("reset")}>
            Reset
          </Button>
        </div>
        <br />
        <br />
        <div
          className={` container col-md-8 `}
          style={{
            padding: "40px 60px",
          }}
        >
          <h3>Color choose</h3>
          <input
            type="color"
            value={color}
            onChange={handleChoose}
            className="form-control offset-md-3 mt-3"
            style={{ width: "50%", height: "50px" }}
          />

          <h3 className="mt-3">{color}</h3>
        </div>
      </div>
    </div>
  );
}

export default Usereducer;
