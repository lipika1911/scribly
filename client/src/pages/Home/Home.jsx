import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  })
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate(); 

  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const handleCloseModal = () => {
    setOpenModal({ ...openModal, isShown: false });
  };

  //Get user info
  const getUserInfo = async() => {
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data&& response.data.user){
        setUserInfo(response.data.user);
      }
    }catch(error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login")
      }
    }
  };

  //Get all notes
  const getAllNotes = async () => {
    try{
      const response = await axiosInstance.get("/get-all-notes");

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    }catch(error){
      console.log("An unexpected error occured. Please try again.")
    }
  }

  //Edit Notes
  const handleEdit = (note) => {
    setOpenModal({
      isShown: true,
      type: 'edit',
      data: note,
    });
  };

  const showToastMessage = (message, type) =>{
    setShowToast({
      isShown: true,
      message,
      type,
    });
  }

  //handle toast message
  const handleCloseToast = () =>{
    setShowToast({
      isShown: false,
      message: ""
    });
  }

  //delete note
  const deleteNote = async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${data._id}`);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete')
        getAllNotes();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Something went wrong!';
      Swal.fire({
        icon: 'error',
        title: 'Failed to delete note',
        text: errorMessage,
        confirmButtonColor: '#7743DB',
      });
    }
  }

  //search notes
  const onSearchNote = async(query) => {
    if (!query.trim()) {
      handleClearSearch();
      return;
    }
    try{
      const response = await axiosInstance.get("/search-notes",{
        params: {query},
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    }catch(error){
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  //handle isPinned
  const updateIsPinned = async(noteData) => {
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  },[])

  return (
    <>
      <Navbar 
        userInfo={userInfo} 
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch} 
        className="animate-fade-in"
      />
      <Container sx={{ mt: 4 }} className="animate-fade-in">
        {allNotes.length > 0 ? (
          <Grid container spacing={3}>
            {allNotes.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Box sx={{ width: '100%', maxWidth: 360 }}>
                  <NoteCard
                    title={item.title}
                    date={item.createdOn}
                    content={item.content}
                    tags={item.tags}
                    isPinned={item.isPinned}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => deleteNote(item)}
                    onPinNote={() => updateIsPinned(item)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyCard 
            imgSrc={isSearch ? "/no-data-found.svg" : "/add-notes.svg"}
            message={isSearch ?
              `Oops! No Notes found matching your search.`:
              `Start creating your first Note! Click the 'Add' button to jot down thoughts, ideas and reminders. Let's get started!`}
          />
        )}
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
            getAllNotes = {getAllNotes}
            showToastMessage = {showToastMessage}
          />
        </Paper>
      </Modal>
      <Toast
        isShown = {showToast.isShown}
        message = {showToast.message}
        type = {showToast.type}
        onClose = {handleCloseToast}
      />
    </>
  );
};

export default Home;
