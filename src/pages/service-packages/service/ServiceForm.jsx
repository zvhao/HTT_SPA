import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormAddEditService } from '../components';
import { Path } from 'constant/path';

const ServiceForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setSelected({ email: 'hao@gmail.com', password: '12345sdfsfd' });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  const initialValues = { email: '', password: '', ...selected };

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 4))
    if (isEditMode) {
      // TODO: Update
    } else {
      // TODO: CREATE
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation(Path.Service, { replace: true });
    }, 1500);
  };

  return (
    <Box>
      <Typography variant="h5">{isEditMode ? 'Cập nhật' : 'Thêm'} dịch vụ</Typography>
      <FormAddEditService initialValues={initialValues} onSubmit={handleSubmit} />
      {loading && <LinearProgress />}
    </Box>
  );
};

export default ServiceForm;
