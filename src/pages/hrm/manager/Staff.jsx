import AddIcon from '@mui/icons-material/Add';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const CardComponent = ({ title, image, description, slug, click }) => (
  <Card component={MainCard} border={false} sx={{ boxShadow: 4 }}>
    <CardMedia component="img" alt={title} height="140" image={image} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'space-between' }}>
      <Button onClick={click} size="small">
        Xem thêm
      </Button>
      {/* <Button component={Link} to={Path.ServiceDetail + `${slug}`} size="small">
        Xem thêm
      </Button> */}
      <Button size="medium" variant="contained" component={Link} to={`/service/edit/${title}`}>
        Update
      </Button>
    </CardActions>
  </Card>
);

const Staff = () => {
  const [cards, _setCards] = useState([
    {
      title: 'Massage body, cột sống',
      image: 'https://cdn.diemnhangroup.com/seoulacademy/2022/08/spa-la-gi-1.jpg',
      description: 'Trị liệu đau nhức cột sống, điều trị trong 1 tháng',
      slug: 'co-vai-gay'
    },
    {
      title: 'Massage chân',
      image: 'https://cdn.diemnhangroup.com/seoulacademy/2022/08/spa-la-gi-1.jpg',
      description: 'Trị liệu đau nhức chân, điều trị trong 1 tháng Trị liệu đau nhức chân, điều trị trong 1 tháng',
      slug: 'be-co'
    },
    {
      title: 'Massage mặt',
      image: 'https://cdn.diemnhangroup.com/seoulacademy/2022/08/spa-la-gi-1.jpg',
      description: 'Trị liệu da mặt, điều trị trong 1 tháng',
      slug: 'day-lung'
    },
    {
      title: 'Massage mặt',
      image: 'https://cdn.diemnhangroup.com/seoulacademy/2022/08/spa-la-gi-1.jpg',
      description: 'Trị liệu da mặt, điều trị trong 1 tháng',
      slug: 'dut-tay'
    }
  ]);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <MainCard>
      <Typography sx={{ mb: 1 }} variant="h4">
        Các nhân viên quản lý
      </Typography>
      <CardActions sx={{ mb: 1 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={ Path.Staff + `/add`}>
          Thêm nhân viên quản lý
        </Button>
      </CardActions>

      
    </MainCard>
  );
};

export default Staff;
