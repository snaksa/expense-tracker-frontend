import React from 'react'
import Box from '@material-ui/core/Box';
import HeroTemplate from '../../templates/hero-template';
import HeroMenu from '../../organisms/hero-menu';
import Login from '../../organisms/login';
import Register from '../../organisms/register';
import {
    Route,
    Switch
} from "react-router-dom";


const HomePage = () => {
    return (
        <Box>
            <HeroMenu />
            <Switch>
                <Route path="/register">
                    <HeroTemplate
                        hero={<Register />}
                    />
                </Route>
                <Route path="/">
                    <HeroTemplate
                        hero={<Login />}
                    />
                </Route>
            </Switch>
        </Box>
    );
}

export default HomePage;
