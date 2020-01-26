import React from 'react'
import HeroTemplate from '../../templates/hero-template';
import HeroMenu from '../../organisms/hero-menu';
import Login from '../../organisms/login';
import Register from '../../organisms/register';

const HomePage = () => {
    return (
        <HeroTemplate
            header={<HeroMenu/>}
            hero={<Register/>}
        />
    );
}

export default HomePage;
