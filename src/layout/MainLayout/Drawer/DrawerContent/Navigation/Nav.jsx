import List from '@mui/material/List';
import menuItems from 'menu-items';
import NavItem from './NavItem';

export default function NestedList() {
  

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {menuItems.items.map((item) => <NavItem  key={item.id} item={item} />)}
    </List>
  );
}