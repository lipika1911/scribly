import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Chip } from '@mui/material';

const AddEditNotes = () => {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');

  const handleAddTag = () => {
    if (inputTag.trim() !== '') {
      setTags([...tags, inputTag.trim()]);
      setInputTag('');
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6" color="primary">Add / Edit Note</Typography>

      <TextField
        label="Title"
        variant="outlined"
        placeholder="Go to gym at 5"
        fullWidth
      />

      <TextField
        label="Content"
        variant="outlined"
        placeholder="Write your note content here..."
        multiline
        rows={6}
        fullWidth
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
          />
          <Button variant="contained" color="primary" onClick={handleAddTag}>
            Add Tag
          </Button>
        </Box>
        <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} color="primary" />
          ))}
        </Box>
      </Box>

      <Button variant="contained" color="primary" onClick={() => {}}>
        Add Note
      </Button>
    </Box>
  );
};

export default AddEditNotes;
