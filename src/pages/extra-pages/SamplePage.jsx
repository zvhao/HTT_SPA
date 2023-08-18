// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api/permissions';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      console.log(result.metadata);
      setData(result.metadata);
    };

    getData();
  }, []);

  return (
    <div>
    {/* Hiển thị dữ liệu từ backend */}
    {data.map((item) => (
      <p key={item.id}>{item.name}</p>
    ))}
  </div>
  );
};

export default SamplePage;
