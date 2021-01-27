import React from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { useEffect, useState } from 'react';

import Login from "./pages/Login";
import HomePage from './pages/HomePage';
import Status from './components/Status';
import AddPlan from "./components/AddPlan";
import HisnetLogin from "./components/HisnetLogin";
import UserInfo from "./components/UserInfo";

const AuthOkay = ({ children }) => {
  const [auth, loading, error] = useAuthState(firebase.auth());
  const [users, setusers] = useState([]);
  useEffect(() => {
    // if(auth) console.log(auth.uid);
    if(auth) firebase.firestore().collection('users').doc(auth.uid).get().then(doc => setusers(doc.data()));
  }, [auth])

  if (loading) return <div className="loading">Auth is Loading</div>;
  if (error) return <div className="error">Auth is Error</div>;
  if (!auth) return <Login />;
  if (!users) return <Status />;
  return children;
};
const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <AuthOkay>
        <Router>
          <Switch>
            {/* <Route path="/pho" exact component={PhoneAuth} />
              <Route path="/add" exact component={EditPurchase} />
              <Route path="/data" exact component={ViewData} />
              <Route path="/:engName" exact component={LookUpForm} />
              <Route path="/:engName/edit" exact component={EditPurchase} /> */}
            <Route path="/mypage" exact component={UserInfo} />
            {/* <Route path="/status" exact component={Status} /> */}
            <Route path="/" exact component={HomePage} />
            <Route path="/add" exact component={AddPlan} />
            <Route path="/hisnetlogin" exact component={HisnetLogin} />
          </Switch>
        </Router>
      </AuthOkay>
      <br />
      {/* <AddPlan /> */}
      {/* <HisnetLogin /> */}
    </div>
  );
};

export default App;
