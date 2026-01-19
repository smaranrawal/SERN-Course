import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
// import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./components/SignIn";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<ProductList />} />
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
