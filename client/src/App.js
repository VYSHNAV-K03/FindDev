import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Register";
import Profilepage from "./pages/Profilepage";
import Logout from "./pages/Logout";
import Profilepage_admin_want from "./pages/Profilepage_admin_want";
import Form from "./pages/Form";
import Landing from "./pages/Landing";
import Notification from "./pages/Notification";
import Notification_each from "./components/Notification_each";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/landing" exact element={<Landing />} />
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/register" exact element={<SignUp />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/profile" exact element={<Profilepage />} />

        <Route path="/infoform" exact element={<Form />} />

        <Route
          path="/profile_admin_want"
          exact
          element={<Profilepage_admin_want />}
        />
        <Route path="/notification" exact element={<Notification />} />
        <Route
          path="/notification_each"
          exact
          element={<Notification_each />}
        />
      </Routes>
    </>
  );
}

export default App;
