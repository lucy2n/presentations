import React from 'react';
import { useState } from 'react';
import { Box, Button, Modal, FormControl, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UsernameModal({ handleClose, open, presentationId, addUser }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Добавляем пользователя в глобальное состояние
    addUser(username);

    setUsername('');
    handleClose();

    // Переход на страницу с презентацией
    navigate(`/presentation/${presentationId}`);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl sx={{ width: '25ch' }}>
              <OutlinedInput
                placeholder="Please enter your name"
                value={username}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit">Join</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}