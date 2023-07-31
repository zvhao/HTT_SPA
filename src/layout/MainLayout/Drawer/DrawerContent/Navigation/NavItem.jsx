import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({ item }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const Icon = item.icon ?? null;

  return (
    <>
      <ListItemButton
        component={item.url ? NavLink : 'div'}
        to={item.url}
        onClick={item.url ? null : handleClick}
        sx={{
          '&.active': {
						bgcolor: "primary.lighter",
            color: "primary.main"
          },
          '&.active .MuiListItemIcon-root span': {
            color: "primary.main"
          }
        }}
      >
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={item.title} />
        {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item?.children?.map((child) => {
              const IconChild = child.icon;

              return (
                <ListItemButton
                  component={NavLink}
                  to={child.url}
                  sx={{
                    pl: 4,
                    '&.active': {
                      bgcolor: "primary.lighter",
                      color: "primary.main"
                    },
                    '&.active .MuiListItemIcon-root span': {
                      color: "primary.main"
                    }
                  }}
                >
                  <ListItemIcon>
                    <IconChild />
                  </ListItemIcon>
                  <ListItemText primary={child.title} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default NavItem;
