import List from '@mui/material/List';
import menuItems from 'menu-items';
import NavItem from './NavItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const NestedList = () => {
  const user = useSelector((state) => state.user.data);
  const [items, setItems] = useState(menuItems.items);
  const setNavItem = (user) => {
    try {
      if (user.role === 'staff') {
        // console.log(user);
        const newArr = menuItems.items.filter((item) => item.id !== 'senior-manager');
        setItems(newArr);
      }
    } catch (error) {}
  };
  useEffect(() => {
    setNavItem(user);
  },[user]);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader">
      {items.map((item) => (
        <NavItem key={item.id} item={item} />
      ))}
    </List>
  );
};
export default NestedList;
