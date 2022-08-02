import Header from "./components/header";
import Banner from "./components/banner";
import Main from "./components/main/main";
import PostForm from "./components/postForm";
import pencil from "./icons/pencil.svg";
import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { useState } from "react";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as actionType from "./helpers/constants.js";
import { getPosts } from "./actions";
function App() {
  const [user, setUser] = React.useState(useSelector((state) => state.profile));

  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    dispatch(getPosts());
    history.push("/");
  };
  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header handleLogout={logout} />
        <Switch>
          <Route path="/post/edit" component={PostForm} />
          <Route path="/postForm" exact component={PostForm} />
          <Route path="/" exact>
            <Banner handleLogout={logout} />
            <Main handleLogout={logout} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
