import React from 'react'
import HeroTemplate from '../../templates/hero-template';
import HeroMenu from '../../organisms/hero-menu';
import Hero from '../../organisms/hero';

const HomePage = () => {
    return (
        <HeroTemplate
            header={<HeroMenu/>}
            hero={<Hero/>}
        />
    );
}

export default HomePage;
