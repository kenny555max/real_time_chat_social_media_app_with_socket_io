import { Paper, Grid, Divider, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import Header from '../components/Header/Header';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { useEffect, useMemo, useState } from 'react';
import image from '../assets/images.png';
import { createChat, getAllChats, getAllUsers } from '../actions';
import { Link, useParams } from 'react-router-dom';

const classes = {
    chatSection: {
        width: '100%',
        height: 'calc(100vh - 150px)'
    },
    profile: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
    sendButton: {
        color: '#fff',
        backgroundColor: 'navy'
    }
};

const ChatBox = () => {
    const { id } = useParams();
    const [inbox, setInbox] = useState(false);
    const [chatData, setChatData] = useState({
        sender_id: '',
        receiver_id: '',
        chat: ''
    });
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const loggedIn_user = JSON.parse(localStorage.getItem('profile'))?.result;
    //users
    //const users = useSelector((state) => state.users.users);
    const { data: users, isLoading } = useQuery({
        queryKey: ['fetch_all_users'],
        queryFn: async () => {
            try {
                const users = await getAllUsers();

                console.log(users);

                return users;
            } catch (error) {
                console.log(error);
            }
        },
        staleTime: 1000000
    });

    let allFriends = useMemo(() => {
        if (isLoading) return;

        if (!users) return;

        return users.filter(user => {
            if (loggedIn_user?.friends.indexOf(user._id) !== -1) {
                return user;
            }
        });
    }, [users, loggedIn_user, isLoading]);

    allFriends = useMemo(() => {
        return !isLoading && allFriends.filter(user => user.username.toLowerCase().indexOf(searchValue) !== -1);
    }, [searchValue, allFriends, isLoading]);
    
    //chats
    const { data: chats, isLoading: is_loading_chats, refetch } = useQuery({
        queryKey: ['fetch_all_chats'],
        queryFn: async () => {
            try {
                const chats = await getAllChats();

                console.log(chats);

                return chats;
            } catch (error) {
                console.log(error);
            }
        },
        staleTime: 1000000
    });
    const { mutate: create_new_chat } = useMutation(
        (new_chat_made) => dispatch(createChat(new_chat_made)),
        {
            onSuccess: () => {
                refetch();

                setChatData({
                    sender_id: '',
                    receiver_id: '',
                    chat: ''
                });
            }
        }
    )
    const related_chats = useMemo(() => {
        if (is_loading_chats) return;
        
        return chats.filter((chat) => (chat.sender_id === loggedIn_user?._id && chat.receiver_id === id) || 
       (chat.sender_id === id && chat.receiver_id === loggedIn_user?._id));
    }, [chats, id, loggedIn_user, is_loading_chats]);
    
    useEffect(() => {
        if (id) setInbox(true);
    }, [id]);
    
    const onChange = (e) => {
        setSearchValue(e.target.value);
    }

    const chat = () => {
        create_new_chat({ ...chatData, sender_id: loggedIn_user?._id, receiver_id: id });
    }

    if (isLoading) return <div>Loading.........</div>
    
    return (
        <>
            <Header />
            <div style={{ marginTop: '70px', height: 'calc(100vh - 70px)' }}>
                <Grid container sx={{ padding: '20px 0 20px 20px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" className="header-message">Chat</Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} sx={classes.chatSection}>
                    <Grid item xs={3} sx={classes.profile}>
                        <List>
                            <ListItem key={loggedIn_user?.username}>
                                <ListItemIcon>
                                <Avatar alt={loggedIn_user?.username} src={loggedIn_user?.profileImage} />
                                </ListItemIcon>
                                <ListItemText primary={loggedIn_user?.username}></ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                        <Grid item xs={12} style={{padding: '10px'}}>
                            <TextField
                                id="outlined-basic-email"
                                label="Search"
                                variant="outlined"
                                fullWidth
                                onChange={onChange}
                                value={searchValue}
                            />
                        </Grid>
                        <Divider />
                        <List>
                            {allFriends.map((user, index) => {
                                return <ListItem key={index} onClick={() => setInbox(true)} component={Link} to={`/lookalike/chat/${user._id}`}>
                                    <ListItemIcon>
                                        <Avatar alt={user.username} src={user.profileImage || image} />
                                    </ListItemIcon>
                                    <ListItemText primary={user.username}></ListItemText>
                                    <ListItemText secondary="online" align="right"></ListItemText>
                                </ListItem>
                            })}
                        </List>
                    </Grid>
                    {inbox ? (
                            <Grid item xs={9}>
                                <List sx={classes.messageArea}>
                                {is_loading_chats ? <CircularProgress /> : related_chats.length > 0 ? related_chats.map((inbox_chat, index) => {
                                    return <ListItem key={index}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align={inbox_chat.sender_id === loggedIn_user?._id ? 'right' : 'left'} primary={inbox_chat.chat}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align={inbox_chat.sender_id === loggedIn_user?._id ? 'right' : 'left'} secondary={inbox_chat.created_at}></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                }) : <Typography variant='h5'>Send a message to this friend</Typography>}
                                </List>
                                <Divider />
                                <Grid container style={{ padding: '20px' }}>
                                    <Grid item xs={11}>
                                        <TextField
                                            id="outlined-basic-email"
                                            label="Type Something"
                                            fullWidth
                                            value={chatData.chat}
                                            onChange={(e) => setChatData({ ...chatData, chat: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={1} align="right">
                                        <IconButton onClick={chat} sx={classes.sendButton} aria-label="add"><SendIcon /></IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid item xs={9}>
                                <Typography variant='h5'>Click on a friend's profile to chat</Typography>
                            </Grid>   
                        )
                }
                </Grid>
            </div>
        </>
  );
}

export default ChatBox;