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

const Service = () => {
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
        Các dịch vụ
      </Typography>
      <CardActions sx={{ mb: 1 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Service + `/add`}>
          Thêm dịch vụ
        </Button>
      </CardActions>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              title={card.title}
              image={card.image}
              description={card.description}
              slug={card.slug}
              click={handleClickOpen('body')}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog
        maxWidth
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {/* <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join('\n')}
          </DialogContentText> */}
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally. To subscribe to this
            website, please enter your email address here. We will send updates occasionally. To subscribe to this website, please enter
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Service;
