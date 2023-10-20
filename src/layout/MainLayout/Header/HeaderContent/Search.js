// material-ui
import { Box, FormControl, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <Grid container sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <Grid item xs={6}>
        <Box>
          <FormControl sx={{ width: { xs: '100%', md: 224, backgroundColor: '#f5f5f5' } }}>
            <OutlinedInput
              size="small"
              id="header-search"
              startAdornment={
                <InputAdornment position="start" sx={{ mr: -0.5 }}>
                  <SearchOutlined />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              inputProps={{
                'aria-label': 'weight'
              }}
              placeholder="Tìm kiếm..."
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
        <Typography sx={{ mr: 3, height: '25px' }} variant="h4">
          {currentTime.format('dddd, DD/MM/YYYY HH:mm:ss')}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Search;
