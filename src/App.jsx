import "./App.css";
import Map from "./component/Map";
import SearchForm from "./component/SearchForm";
import TollData from "./component/TollData";
function App() {
  return (
    <div>
      <h1 className="header">Toll Calculator</h1>
      <div className="container">
        <SearchForm />
        <Map />
      </div>
      <TollData />
    </div>
  );
}

export default App;
