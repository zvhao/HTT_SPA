import AddIcon from '@mui/icons-material/Add';
import { Button, CardActions } from "@mui/material";
import MainCard from "components/MainCard";
import { Path } from "constant/path";
import { Link } from "react-router-dom";

function ServiceType() {
  return <MainCard>
    <CardActions sx={{ mb: 1 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.ServiceType + `/add`}>
          Thêm loại dịch vụ
        </Button>
      </CardActions>
  </MainCard>;
}

export default ServiceType;
