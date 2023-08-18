import AddIcon from '@mui/icons-material/Add';
import { Button, CardActions, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import { Link } from 'react-router-dom';


const Branch = () => {

  return (
    <MainCard>
      <Typography sx={{ mb: 1 }} variant="h4">
        Các chi nhánh
      </Typography>
      <CardActions sx={{ mb: 1 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Branch + `/add`}>
          Thêm chi nhánh mới
        </Button>
      </CardActions>

    </MainCard>
  );
};

export default Branch;
