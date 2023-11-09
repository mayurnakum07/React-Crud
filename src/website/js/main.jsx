import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../pages/css/index.css";
import Usecontex from "../theme/Theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Usecontex>
    <App />
  </Usecontex>
  // </React.StrictMode>,
);
