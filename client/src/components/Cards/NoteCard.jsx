import React from 'react';
import { Paper, Grid, Typography, IconButton, Box } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        p: 2,
        minWidth: '360px',
        minHeight: 110, // uniform height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease-in-out',
        marginLeft: 0,
        marginRight: 0,
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2" color="text.primary">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={onPinNote}
            sx={{
              color: isPinned ? 'primary.main' : 'text.disabled',
            }}
          >
            <PushPinIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 1,
          fontSize: '0.8rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {content}
      </Typography>

      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {tags}
        </Typography>
        <Box>
          <IconButton
            onClick={onEdit}
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'success.main',
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={onDelete}
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'error.main',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Grid>
    </Paper>
  );
};

export default NoteCard;
