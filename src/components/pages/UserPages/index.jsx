import React from 'react'
import {
    Route,
    Switch
} from "react-router-dom";
import { useHistory } from 'react-router';
import Box from '@material-ui/core/Box';
import HeroTemplate from 'components/templates/hero-template';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';

const AnonPages = () => {

    const history = useHistory();

    if(localStorage.getItem('token')) {
        history.push('/admin');
    }

    return (
        <Box>
            <Switch>
                <Route path="/register">
                    <HeroTemplate
                        hero={<RegisterPage />}
                    />
                </Route>
                <Route path="/login">
                    <HeroTemplate
                        hero={<LoginPage />}
                    />
                </Route>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Box>
    );
}

export default AnonPages;
