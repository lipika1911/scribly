import React, { useState } from 'react';
import {
  Container,
  Grid,
  Fab,
  Box,
  Modal,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NoteCard from '../../components/Cards/NoteCard';
import Navbar from '../../components/Navbar/Navbar';
import AddEditNotes from './AddEditNotes';

const notes = [
  {
    title: 'Meeting on 7th April',
    date: '3rd April 2024',
    content: 'Important meeting to discuss new updates.',
    tags: '#meeting',
    isPinned: true,
  },
  {
    title: 'Project Deadline',
    date: '5th April 2024',
    content: 'Reminder about the final project submission.',
    tags: '#deadline',
    isPinned: false,
  },
  {
    title: 'Team Lunch',
    date: '6th April 2024',
    content: 'Plan lunch outing with the whole team at 1PM.',
    tags: '#fun',
    isPinned: false,
  },
  {
    title: 'Client Call',
    date: '4th April 2024',
    content: 'Schedule Zoom call with the client at 10AM.',
    tags: '#work',
    isPinned: true,
  },
];

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const handleCloseModal = () => {
    setOpenModal({ ...openModal, isShown: false });
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {notes.map((note, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ width: '100%', maxWidth: 360 }}>
                <NoteCard
                  title={note.title}
                  date={note.date}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.isPinned}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onPinNote={() => {}}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          width: 64,
          height: 64,
        }}
        onClick={() => {
          setOpenModal({ isShown: true, type: 'add', data: null });
        }}
      >
        <AddIcon sx={{ fontSize: 32 }} />
      </Fab>

      {/* MUI Modal */}
      <Modal
        open={openModal.isShown}
        onClose={handleCloseModal}
        aria-labelledby="add-edit-note-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(0.5px)',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: { xs: '90%', sm: '70%', md: '40%' },
            maxHeight: '80vh',
            overflowY: 'auto',
            p: 3,
            borderRadius: 2,
            outline: 'none',
            bgcolor: 'background.default',
          }}
        >
          <AddEditNotes 
            onCancel={handleCloseModal} 
            type={openModal.type}
            noteData={openModal.data}
            onClose = {()=>{
              setOpenModal({
                isShown: false,
                type: "add",
                data: null,
              });
            }}
          />
        </Paper>
      </Modal>
    </>
  );
};

export default Home;
