import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Register";
import DetailsForm from "./pages/DetailsForm";
import Profilepage from "./pages/Profilepage";
import Logout from "./pages/Logout";
import Profilepage_admin_want from "./pages/Profilepage_admin_want";
import Form from "./pages/Form";
import Landing from "./pages/Landing";
import ProfilePageHish from "./pages/ProfilePageHish";
import Rsvp1 from "./pages/Rsvp1";
import SignIn_Rsvp from "./pages/Login-Rsvp";
import Tutorial from "./pages/Tutorial";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/landing" exact element={<Landing />} />
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/register" exact element={<SignUp />} />
        <Route path="/logout" exact element={<Logout />} />
        {/* <Route path="/infoform" exact element={<DetailsForm />} /> */}
        <Route path="/profile" exact element={<Profilepage />} />
        {/* <Route path="/profile" exact element={<ProfilePageHish />} /> */}

        <Route path="/infoform" exact element={<Form />} />

        <Route
          path="/profile_admin_want"
          exact
          element={<Profilepage_admin_want />}
        />
        <Route path="/rsvp1" exact element={<Rsvp1 />} />
        <Route path="/login_rsvp" exact element={<SignIn_Rsvp />} />
        <Route path="/tutorial" exact element={<Tutorial />} />
      </Routes>
    </>
  );
}

export default App;
