import React from 'react';
import { Box, TextField } from '@mui/material';
import Button from '../Button';

type DynamicFormProps<T> = {
  object: T;
  setObject: React.Dispatch<React.SetStateAction<T>>;
  buttonText: string;
  onSubmit: () => void;
};

const DynamicForm = <T extends { [key: string]: string }>({
  object,
  setObject,
  buttonText,
  onSubmit,
}: DynamicFormProps<T>) => {
  const handleChange = (key: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setObject(prevObject => ({
      ...prevObject,
      [key]: event.target.value,
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '50%',
        height: '75%',
        padding: 3,
        margin: '0 auto',
        boxShadow: 3,
        bgcolor: 'background.paper',
        position: 'relative',
        top: '12.5%',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {Object.keys(object).map((key) => (
        <TextField
          key={key}
          label={key}
          value={object[key] || ''}
          onChange={handleChange(key as keyof T)}
          variant="outlined"
          fullWidth
        />
      ))}
      <Button
        text={buttonText}
        size="medium"
        borderRadius="4px"
        sx={{ width: '100%' }}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default DynamicForm;
