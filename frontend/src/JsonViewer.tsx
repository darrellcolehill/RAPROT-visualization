
import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Collapse,
  Button,
} from '@mui/material';
// import { ExpandLess, ExpandMore } from '@mui/icons-material';

const JsonViewer = ({ data, level = 0 }) => {
  const [open, setOpen] = React.useState({});

  const handleClick = (key) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [key]: !prevOpen[key],
    }));
  };

  const renderData = (data, level) => {
    if (typeof data === 'object' && data !== null) {
      return (
        <List component="div" disablePadding>
          {Object.keys(data).map((key) => (
            <div key={key}>
              <ListItem button onClick={() => handleClick(key)} style={{ paddingLeft: level * 20 }}>
                <ListItemText primary={key} />
                {open[key] ? <Button>LESS</Button> : <Button>MORE</Button>}
              </ListItem>
              <Collapse in={open[key]} timeout="auto" unmountOnExit>
                {renderData(data[key], level + 1)}
              </Collapse>
            </div>
          ))}
        </List>
      );
    } else {
      return (
        <Typography style={{ paddingLeft: level * 20 }}>
          {Array.isArray(data) ? data.join(', ') : data.toString()}
        </Typography>
      );
    }
  };

  return renderData(data, level);
};

JsonViewer.propTypes = {
  data: PropTypes.any.isRequired,
  level: PropTypes.number,
};

export default JsonViewer;
