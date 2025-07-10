import React from 'react';
import { Container, Grid, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NoteCard from '../../components/Cards/NoteCard';
import Navbar from '../../components/Navbar/Navbar';

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
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {notes.map((note, index) => (
            <Grid item xs={12} sm={6} md={4} display="flex" key={index}>
              <Box sx={{ width: '100%', maxWidth: 360}}>
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
        onClick={() => {}}
      >
        <AddIcon sx={{ fontSize: 32 }} />
      </Fab>
    </>
  );
};

export default Home;
