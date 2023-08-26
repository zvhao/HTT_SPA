// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import React, { useEffect, useState } from 'react';
import { permissionApi } from '../../api';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await permissionApi.fetchData();
        setData(result.metadata);
      } catch (error) {
        console.error(error);
      }
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
