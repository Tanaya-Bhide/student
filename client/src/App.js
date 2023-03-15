import { BrowserRouter, Routes, Route } from "react-router-dom";
//import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import view from "./pages/view";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/addstudent" Component={AddEdit} />
          <Route exact path="/update/:id" Component={AddEdit} />
          <Route exact path="/view/:id" Component={view} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
