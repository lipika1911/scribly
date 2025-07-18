import React from 'react';
import { Paper, Grid, Typography, IconButton, Box, Chip } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

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
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="subtitle2" color="text.primary">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {moment(date).format('Do MMM YYYY')}
          </Typography>
        </Grid>
        <Grid>
          <IconButton
            onClick={onPinNote}
            size="small"
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
          lineHeight: '1.3rem',
          maxHeight: '4rem',
        }}
      >
        {content}
      </Typography>

      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            gap: 0.5,
            pr: 1,
            maxWidth: '70%',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc',
              borderRadius: '2px',
            },
          }}
        >
          {tags?.map((tag, index) => (
            <Chip key={tag + index} label={tag} size="small" color="primary" />
          ))}
        </Box>
        <Box>
          <IconButton
            onClick={onEdit}
            size="small"
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
            size="small"
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
