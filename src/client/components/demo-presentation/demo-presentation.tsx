import { useState } from 'react';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import UsernameModal from '../username-modal/username-modal';

const DemoPresentation = ({ view, presentation, addUser }) => { // Получаем addUser
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <>
        <Card
          sx={
            view === 'list'
              ? { display: 'flex', justifyContent: 'space-between', maxWidth: '80vw' }
              : { maxWidth: 345 }
          }
        >
          {view !== 'list' && (
            <CardMedia
              component="img"
              height={140}
              image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPZtazg4AP3nNQwiGOxETGcjH1JPdqmuk1t7bEhHOlvMiBYYm6PRWurM5_YtwlQvYIMQ5a"
              alt="green iguana"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {presentation.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" color="primary" variant="contained" onClick={handleOpen}>
              Join
            </Button>
          </CardActions>
        </Card>
        <UsernameModal open={open} handleClose={handleClose} presentationId={presentation.id} addUser={addUser} /> {/* Передаем addUser */}
      </>
    );
  };
  
  export default DemoPresentation;