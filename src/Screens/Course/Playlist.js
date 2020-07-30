import React from 'react';
import './index.css';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleSetVideo = (index) => {
        props.handleSetVideo(index)
    }
    return (
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={"Module: "+props.module.module_name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.module.module_data.map(index => {
                        return (<ListItem button className={classes.nested} key={index.name}>
                            <ListItemIcon>
                                <PlayCircleOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary={index.name} onClick={() => handleSetVideo(index)} />
                            <ListItemIcon>
                                {index.completed ? <CheckCircleIcon style={{ color: '#4CAF50' }} /> : null}
                            </ListItemIcon>
                        </ListItem>)
                    })}
                </List>
            </Collapse>
        </List>
    )
}