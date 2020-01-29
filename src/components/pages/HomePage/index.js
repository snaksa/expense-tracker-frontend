import React from 'react'
import HeroTemplate from '../../templates/hero-template';
import HeroMenu from '../../organisms/hero-menu';
import Login from '../../organisms/login';

const HomePage = () => {
    return (
        <HeroTemplate
            header={<HeroMenu/>}
            hero={<Login/>}
        />
    );
}

export default HomePage;
