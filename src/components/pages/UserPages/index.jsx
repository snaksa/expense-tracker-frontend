import React from 'react'
import {
    Route,
    Switch
} from "react-router-dom";
import { useHistory } from 'react-router';
import Box from '@material-ui/core/Box';
import { useCurrentUserQuery } from 'api';
import HeroTemplate from 'components/templates/hero-template';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import SplashScreen from '../SplashScreen/splash-screen';

const AnonPages = () => {

    const { data, loading } = useCurrentUserQuery();
    const history = useHistory();

    if(loading) {
        return <SplashScreen />
    }

    if(data) {
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
