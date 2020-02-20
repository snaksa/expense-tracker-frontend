import React from 'react'
import Box from '@material-ui/core/Box';
import {
    Route,
    Switch
} from "react-router-dom";
import Login from '../../organisms/login';
import Register from '../../organisms/register';
import HeroTemplate from '../../templates/hero-template';


const HomePage = () => {
    return (
        <Box>
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
