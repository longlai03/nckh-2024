
import Dashboard from "./pages/dashboard/Dashboard";
import Predict from "./pages/predict/Predict";
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Statistic from "./pages/statistic/Statistic";
import User from "./pages/user/User";
import Navigation from "./pages/navigation/Navigation";
import "./styles/Global.css"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Predict />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
