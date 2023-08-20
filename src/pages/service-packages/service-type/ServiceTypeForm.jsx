import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormAddEditServiceType } from '../components';
import { Path } from 'constant/path';

const ServiceTypeForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setSelected();

      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  const initialValues = { ...selected };

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 4));
    if (isEditMode) {
      // TODO: Update
    } else {
      // TODO: CREATE
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation(Path.ServiceType, { replace: true });
    }, 1500);
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} loại dịch vụ</Typography>
      <FormAddEditServiceType initialValues={initialValues} onSubmit={handleSubmit} />
      {loading && <LinearProgress />}
    </Box>
  );
};

export default ServiceTypeForm;
