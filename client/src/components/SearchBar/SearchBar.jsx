import React from 'react';
import { InputBase, IconButton, Box, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
            height: 40,
            mx: 2,
            px: 1,
            backgroundColor: '#fff',
        }}
      elevation={0}
    >
      <InputBase
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
        sx={{ ml: 1, flex: 1 }}
        inputProps={{ 'aria-label': 'search' }}
      />
      {value && (
        <IconButton onClick={onClearSearch} size="small" sx={{ color: 'text.secondary' }} disableRipple>
          <ClearIcon />
        </IconButton>
      )}
      <IconButton 
        type="submit" 
        sx={{ p: '5px', color: 'primary.main' }} 
        disableRipple
        onClick={handleSearch}
        >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
