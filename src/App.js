import "./App.css";
import { MoralisProvider } from "react-moralis";
import { useEffect, useReducer } from "react";
// import Certificate from "./Components/Certificate";

// import Certificate from "./Components/Certificate";
// import Header from "./Components/Header";
// import ManualHeader from "./Components/ManualHeader";
import { Redirect, Route, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Institution from "./pages/Institution";
import IstititionCertificates from "./pages/IstititionCertificates";
import Student from "./pages/Student";
import Logout from "./pages/Logout";
const userIntialState = { account: "", name: "", role: "" };
const userReducer = (state, action) => {
  if (action.type === "accountUpdate") {
    return { account: action.account, name: action.name, role: action.role };
  }
};

function App() {
  const [userState, userDispatch] = useReducer(userReducer, userIntialState);
  useEffect(() => {
    if (
      localStorage.getItem("account") != null &&
      localStorage.getItem("name") != null &&
      localStorage.getItem("role") != null
    ) {
      userDispatch({
        type: "accountUpdate",
        account: localStorage.getItem("account"),
        name: localStorage.getItem("name"),
        role: localStorage.getItem("role"),
      });
    }
  }, []);
  const history = useHistory();
  if (userState.role === "Institution") {
    history.push("/Institution");
  } else if (userState.role === "Student") {
    history.push("/Student");
  } else {
    history.push("/Login");
  }
  console.log(userState);
  return (
    <MoralisProvider initializeOnMount={false}>
      <div className="App">
        {/* <Header />
          <ManualHeader />
          <Certificate /> 
          */}
        <Route path="/Login" exact>
          <Home userDispatchFunction={userDispatch}></Home>
        </Route>
        <Route path="/Logout" exact>
          <Logout />
        </Route>
        <Route></Route>
        <Route path="/Student" exact>
          <Student />
        </Route>

        <Route path="/Institution" exact>
          <Institution />
        </Route>
        <Route path="/Institution/Issue" exact>
          <Institution />
        </Route>
        <Route path="/Institution/Certificates" exact>
          <IstititionCertificates />
        </Route>
      </div>
    </MoralisProvider>
  );
}

export default App;
