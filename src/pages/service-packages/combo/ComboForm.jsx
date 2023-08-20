import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormAddEditCombo } from '../components';
import { Path } from 'constant/path';

const ComboForm = () => {
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
      navigation(Path.Combo, { replace: true });
    }, 1500);
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} combo</Typography>
      <FormAddEditCombo initialValues={initialValues} onSubmit={handleSubmit} />
      {loading && <LinearProgress />}
    </Box>
  );
};

export default ComboForm;
