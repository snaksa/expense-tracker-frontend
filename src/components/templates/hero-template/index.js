import React from 'react'
import Grid from '@material-ui/core/Grid';

const HeroTemplate = ({ header, hero }) => {
    return (
        <Grid container direction="column">
            {header && <Grid item>{header}</Grid>}
            {hero && <Grid item>{hero}</Grid>}
        </Grid >
    );
}

export default HeroTemplate;
