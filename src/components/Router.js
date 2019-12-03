import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./login/Login";
import App from "./app/App";
import NotFound from "./notfound/NotFound";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/app/" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;