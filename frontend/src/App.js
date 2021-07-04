import "./App.css";
import React, { useState } from "react";
import { Component } from 'react';
import "./css/sb-admin-2.css"


import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import DashboardPage from "./components/DashboardPage";
import LogoutPage from "./components/LogoutPage";
import LoadUserPage from "./components/LoadUserPage";
import Page404 from "./components/404Page";
import NewInsurance from "./components/newInsurancePage";
import ThankYou from "./components/ThankYouPage";
class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch className='App'>
                        <Route exact path='/' render={() => <DashboardPage />} />
                        <Route exact path='/new-insurance' render={() => <NewInsurance />} />
                        <Route exact path='/ThankYou' render={() => <ThankYou />} />
                        <Route exact path='/sign-in' render={() => <LoginPage />} />
                        <Route exact path='/sign-up' render={() => <RegistrationPage />} />
                        <Route exact path='/dashboard' render={() => <DashboardPage />} />
                        <Route exact path='/logout' render={() => <LogoutPage />} />
                        <Route exact path='/LoadUser' render={() => <LoadUserPage />} />
                        <Route path='*' exact={true} component={Page404} />

                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;



