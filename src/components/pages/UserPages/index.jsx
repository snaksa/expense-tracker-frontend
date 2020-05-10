import React from 'react'
import {
    Route,
    Switch
} from "react-router-dom";
import Box from '@material-ui/core/Box';
import HeroTemplate from 'components/templates/hero-template';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';

const AnonPages = () => {
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
