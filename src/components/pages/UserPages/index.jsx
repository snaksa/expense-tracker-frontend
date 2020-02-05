import React from 'react'
import Box from '@material-ui/core/Box';
import {
    Route,
    Switch
} from "react-router-dom";
import HeroMenu from '../../organisms/hero-menu';
import Login from '../../organisms/login';
import Register from '../../organisms/register';
import HeroTemplate from '../../templates/hero-template';


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
