import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/login/login.js';
import Cadastro from './pages/cadastro/cadastro.js';
import Donator from './pages/donator/donator.js'
import DonatorBank from './pages/donatorBank/donatorBank.js';
import Donations from './pages/donations/donations.js';
import BankDonations from './pages/bankDonations/bankDonations.js';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/donator" exact component={Donator} />
                <Route path="/donatorBank" exact component={DonatorBank} />
                <Route path="/donations" exact component={Donations} />
                <Route path="/donations/banks" exact component={BankDonations} />
                <Route path="/cadastro" exact component={Cadastro} />
            </Switch>
        </BrowserRouter>
    );
}
