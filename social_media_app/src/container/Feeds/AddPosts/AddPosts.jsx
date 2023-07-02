import CollectionsIcon from '@mui/icons-material/Collections';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import './AddPosts.scss';
import { useEffect, useMemo } from 'react';
import { getAllUsers, createPost } from '../../../actions';
import { Box, Divider, Paper, Avatar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


import { useState, useRef } from 'react';
import TagModal from './TagModal';

const AddPosts = () => {
    const [feeling, setFeeling] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    const users = useSelector((state) => state.users.users);
    const allFriends = useMemo(() => {
        return users.filter(data => data._id !== user);
    }, [users, user]);
    //const user = useMemo(() => {
      //  return users.filter(user => user._id === currentUserId);
    //}, [users, currentUserId]);
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        selectedFile: '',
        text: '',
        friendsTagged: []
    });

    useEffect(() => {
        dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef(null);
    
    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const readFile = (event) => {
        const files = event.target.files;
        let reader = new FileReader();
        reader.onload = function (fileLoadedEvent) {
            setPostData({ ...postData, selectedFile: fileLoadedEvent.target.result });
        };
        if(files[0]) {
            // This does not return the text. It just starts reading.
            // The onload handler is triggered when it is done and the result is available.
            reader.readAsDataURL(files[0]);
        }
    }

    const tagFriends = (user) => {
        setPostData({ ...postData, friendsTagged: [ ...postData.friendsTagged, { userId: user._id, username: user.username } ] });

        setOpen(false);
    }

    const onEmojiClick = (emojiData) => {
        setPostData({ ...postData, text: postData.text + emojiData.emoji });

        setFeeling(!feeling);
    }

    const createPosts = () => {
        if (postData.selectedFile === '') return;

        dispatch(createPost({ ...postData, username: user.username, userId: user._id, userImage: user.profileImage }));

        setPostData({
            selectedFile: '',
            text: '',
            friendsTagged: []
        });
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, marginBottom: '40px' }} className='add_posts'>
                <Paper sx={{ padding: '0 20px' }} elevation={4}>
                    <Box sx={{ padding: '20px 0', display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            alt="Remy Sharp"
                            component={Link}
                            to={`/lookalike/profile/${user?._id}`}
                            src={user?.profileImage}
                        />
                        <input
                            value={postData.text}
                            onChange={(e) => setPostData({ ...postData, [e.target.name]: e.target.value })}
                            type="text"
                            name='text'
                            placeholder={`What's on your mind ${user?.username}`}
                            style={{ flex: '1', paddingLeft: '20px', border: '0', fontSize: '1.1em' }}
                        />
                    </Box>
                    <Divider />
                    <Box className='posts' sx={{ padding: '20px 0' }}>
                        <div className='icon-wrapper' style={{ flex: '1', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CollectionsIcon sx={{ color: 'red' }} />
                                <input
                                    type="file"
                                    name='selectedFile'
                                    style={{ display: 'none' }}
                                    ref={hiddenFileInput}
                                    onChange={readFile}
                                />
                                <Button style={{ color: '#000', textTransform: 'capitalize', fontWeight: 'bolder' }} onClick={handleClick}>photo or video</Button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Button onClick={handleOpen}>
                                    <LabelIcon color='primary' />
                                    <Typography variant='h6'>Tag</Typography>
                                </Button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <LocationOnIcon color='success' />
                                <Typography variant='h6'>Location</Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Button onClick={() => setFeeling(!feeling)}>
                                    <EmojiEmotionsIcon color='warning' />
                                    <Typography variant='h6'>Feelings</Typography>
                                </Button>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <Button size='small' onClick={createPosts} variant='contained' color='success'>Share</Button>
                            </div>
                        </div>
                        {feeling && (
                            <div style={{ marginTop: '20px' }}>
                                <EmojiPicker
                                    theme='dark'
                                    onEmojiClick={onEmojiClick}
                                    width='100%'
                                />
                            </div>
                        )}
                        {postData.selectedFile && (
                            <div style={{ marginTop: '20px' }}>
                                <img width='100%' height='100%' src={postData.selectedFile} alt="selected file" />
                            </div>
                        )}
                    </Box>
                </Paper>
                {allFriends.length > 0 && (
                    <TagModal open={open} tagFriends={tagFriends} allFriends={allFriends} handleClose={handleClose} />
                )}
            </Box>
        </>
    )
}

export default AddPosts;