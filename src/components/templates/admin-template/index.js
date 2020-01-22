import React from 'react'
import Box from '@material-ui/core/Box';

const AdminTemplate = ({ menu, content }) => {
    return (
        <Box width={1}>
            {content}
        </Box>
    );
}

export default AdminTemplate;
