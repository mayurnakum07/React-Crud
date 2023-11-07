import "./App.css";
import AddMovies from "./component/AddMovies";
import EditMovies from "./component/EditMovies";
// import RealtimeDatabase from "./RealtimeDatabase";
import ListMovies from "./component/ListMovies";

function App() {
  return (
    <>
      <ListMovies />
      <AddMovies />
      <EditMovies />
    </>
  );
}

export default App;
