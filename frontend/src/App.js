import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./Components/Products/Create";
import List from "./Components/Products/List";
import Login from "./Components/Login";
import ProtectedRoute from "./Common/ProtectedRoute";
import Edit from "./Components/Products/Edit";
import View from "./Components/Products/View";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path={`/`} exact element={<Login />} />
            <Route path={`/login`} element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
              <Route exact path="/products" element={<List />} />
              <Route exact path="/products/create" element={<Create />} />
              <Route exact path="/products/:id/edit" element={<Edit />}/>
              <Route exact path="/products/:id/view" element={<View />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
