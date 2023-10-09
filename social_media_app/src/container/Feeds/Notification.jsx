import image from '../../assets/images.png';
import RedeemIcon from '@mui/icons-material/Redeem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Box, Typography, Avatar } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
    const users = useSelector((state) => state.users.users);
    const id = JSON.parse(localStorage.getItem('profile'))?.result?._id
    //profile_user
    const user = useMemo(() => {
        return users.filter((user) => user._id === id);
    }, [users, id]);
    //profile_user-friends
    const allFriends = useMemo(() => {
        return users.filter(friend => user[0]?.friends.indexOf(friend._id) !== -1 && friend);
    }, [users, user]);

    return (
        <Box>
            <div style={{ display: 'flex' }}>
                <RedeemIcon />
                <Typography variant='body1'><strong>Shade</strong> and <strong>16 others</strong> have birthdays today</Typography>  
            </div>
            <div style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '20px', height: '300px', marginTop: '20px' }}>
                <Typography variant='h6'>This is a Notification</Typography>
            </div>
            <div style={{ marginTop: '40px' }}>
                <h3>Online Friends</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {allFriends.map((user) => {
                        return <ListItem key={user._id} sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bolder' }}>
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={user.profileImage} />
                                </ListItemAvatar>
                                <ListItemText
                                primary={user.username}
                                />
                            </ListItem>
                    })}
                </List>
            </div>
        </Box>
    )
}

export default Notification;