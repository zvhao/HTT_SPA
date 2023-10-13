import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CardActions } from '@mui/material';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { courseApi } from 'api';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}


function Course() {
  const [courseData, setCourseData] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await courseApi.fetchData();
        console.log(result);
        if (result && result?.metadata) {
          const allcourses = result.metadata;

          setCourseData(allcourses);
          console.log('result: ', allcourses);
        }
        if (result?.response?.data?.code && result.response.data.code === 403) {
          // console.log('result: ', result.response.data.code);
          // navigation(Path.FORBIDDEN, { replace: true });
        }
      } catch (error) {
        if (error?.response?.data?.code && error.response.data.code === 403) {
          // console.log('error: ', error.response.data.code);
          // navigation(Path.FORBIDDEN, { replace: true });
        }
      }
    };
    getData();
  });

  return (
    <MainCard>
      <CardActions sx={{ mb: 1 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Course + `/add`}>
          Thêm liệu trình
        </Button>
      </CardActions>
    </MainCard>
  );
}

export default Course;
