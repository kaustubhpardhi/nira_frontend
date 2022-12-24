import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

const DrawerListItem = ({ text, icon }) => {
    return (
        <ListItem>
            <ListItemButton>
                <ListItemIcon sx={{minWidth: '35px'}}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};

export default DrawerListItem;