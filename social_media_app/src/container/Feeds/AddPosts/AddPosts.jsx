import { useQuery, useMutation } from 'react-query';

import CollectionsIcon from '@mui/icons-material/Collections';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import './AddPosts.scss';
import { useMemo } from 'react';
import { getAllUsers, createPost } from '../../../actions';
import { Box, Divider, Paper, Avatar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { useState, useRef, useEffect } from 'react';
import TagModal from './TagModal';

const AddPosts = () => {
    const dispatch = useDispatch();
    const socket = useSelector((state) => state.users.socket);
    const [feeling, setFeeling] = useState(false);
    const [open, setOpen] = useState(false);
    const [postData, setPostData] = useState({
        selectedFile: '',
        text: '',
        friendsTagged: []
    });
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    const { data: users, isLoading, isError, error: get_all_users_error } = useQuery({
        queryKey: ['fetch_all_users'],
        queryFn: async () => {
            try {
                const users = await getAllUsers();

                //console.log(users);
                return users;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        staleTime: 1000000
    });
    const { mutate: create_new_post, isLoading: is_creating_new_post, isError: error_creating_post, error } = useMutation(
        (new_post_data) => dispatch(createPost(new_post_data)),
        {
            onSuccess: () => {
                socket.emit('posted', { username: user.username, email: user.email });

                setPostData({
                    selectedFile: '',
                    text: '',
                    friendsTagged: []
                });
            }   
        }
    );
    useEffect(() => {
        if (!socket) return;

        socket.on('notification', (message) => {
            console.log(message);
        })
    },[user, socket]);
    const allFriends = useMemo(() => {
        if (isLoading) return <div>Loading user............</div>

        if (isError) return <div>Error: {get_all_users_error}</div>

        return users.filter(data => data._id !== user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, user, isLoading, isError]);

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

        create_new_post({
            ...postData,
            username: user.username,
            userId: user._id,
            userImage: user.profileImage
        });
    }

    if (error_creating_post) return <div>Error: {error}</div>

    return (
        <>
            <Box sx={{ flexGrow: 1, marginBottom: '40px' }} className='add_posts'>
                {is_creating_new_post && (
                    <div style={{
                        position: 'fixed',
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        top: '0',
                        right: '0',
                        left: '0',
                        bottom: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '2em'
                    }}>creating new post</div>
                )}
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