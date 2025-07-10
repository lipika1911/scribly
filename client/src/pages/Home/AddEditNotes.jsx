import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddEditNotes = ({ noteData, type, onClose, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');

  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  // Add note
  const addNewNote = async () => {
    // Your logic here
  };

  // Edit note
  const editNote = async () => {
    // Your logic here
  };

  const handleAddTag = () => {
    const trimmed = inputTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddNote = () => {
    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter the title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!content.trim()) {
      setContentError('Please enter the content');
      hasError = true;
    } else {
      setContentError('');
    }

    if (hasError) return;

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <Box position="relative" display="flex" flexDirection="column" gap={3}>
      <IconButton
        aria-label="close"
        onClick={onCancel}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" color="primary">Add / Edit Note</Typography>

      <TextField
        label="Title"
        variant="outlined"
        placeholder="Go to gym at 5"
        fullWidth
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (titleError) setTitleError('');
        }}
        error={!!titleError}
        helperText={titleError}
      />

      <TextField
        label="Content"
        variant="outlined"
        placeholder="Write your note content here..."
        multiline
        rows={6}
        fullWidth
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          if (contentError) setContentError('');
        }}
        error={!!contentError}
        helperText={contentError}
      />

      <Box>
        <Typography variant="subtitle1" color="text.primary">Tags</Typography>
        <Box display="flex" gap={1} mt={1}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Add a tag"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={handleAddTag}>
            Add Tag
          </Button>
        </Box>
        <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              color="primary"
              onDelete={() => handleRemoveTag(tag)}
            />
          ))}
        </Box>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </Stack>
    </Box>
  );
};

export default AddEditNotes;
