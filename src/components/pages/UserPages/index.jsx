import React from 'react'
import Box from '@material-ui/core/Box';
import {
    Route,
    Switch
} from "react-router-dom";
import RegisterPage from './RegisterPage';
import HeroTemplate from '../../templates/hero-template';
import HomePage from './HomePage';


const AnonPages = () => {
    return (
        <Box>
            <Switch>
                <Route path="/register">
                    <HeroTemplate
                        hero={<RegisterPage />}
                    />
                </Route>
                <Route path="/">
                    <HeroTemplate
                        hero={<HomePage />}
                    />
                </Route>
            </Switch>
        </Box>
    );
}

export default AnonPages;
