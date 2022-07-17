import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Register";
import DetailsForm from "./pages/DetailsForm";
import Profilepage from "./pages/Profilepage";
import Logout from "./pages/Logout";
import Profilepage_admin_want from "./pages/Profilepage_admin_want";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/register" exact element={<SignUp />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/infoform" exact element={<DetailsForm />} />
        <Route path="/profile" exact element={<Profilepage />} />
        <Route
          path="/profile_admin_want"
          exact
          element={<Profilepage_admin_want />}
        />
      </Routes>
    </>
  );
}

export default App;
