import { Button, CardActions } from "@mui/material";
import MainCard from "components/MainCard";
import { Path } from "constant/path";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

function Course() {
  return <MainCard>
  <CardActions sx={{ mb: 1 }}>
      <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Course + `/add`}>
        Thêm liệu trình
      </Button>
    </CardActions>
</MainCard>;
}

export default Course;