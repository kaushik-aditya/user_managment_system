import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type RightSideModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const RightSideModal: React.FC<RightSideModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
    >
      <Box
        sx={{
          width: '30%',
          height: '100%',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          p: 2,
          boxShadow: 24,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default RightSideModal;
