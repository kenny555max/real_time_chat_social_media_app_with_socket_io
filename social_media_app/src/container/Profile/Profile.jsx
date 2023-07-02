import Posts from "../Feeds/Posts/Posts";
import image from '../../assets/images.png';
import './Profile.scss';
import { useRef, useState, useEffect, useMemo } from "react";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getAllUsers, updateUserFriend } from "../../actions";
import { useParams, Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import ClipperDrawer from "../../components/ClipperDrawer/ClipperDrawer";
import listArray from "../list";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";


export const SideBar = styled('div')(({ theme }) => ({
    position: 'fixed',
    width: '20%',
    top: '0',
    left: '0',
    zIndex: '1',
    height: '100%',
    bottom: '0',
    [theme.breakpoints.down('lg')]: {
        width: '50px',
    },
}));

export const Main = styled('div')(({ theme }) => ({
    width: '80%',
    marginLeft: 'auto',
    marginTop: '70px',
    [theme.breakpoints.down('lg')]: {
        width: 'calc(100% - 50px)',
        '.icon-wrapper': {
            flexWrap: 'wrap'
        },
        '.notification': {
            padding: '20px 40px'
        }
    }
}));

const bannerImageStyle = (coverImage) => {
    return {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(${coverImage === '' ? image : coverImage})`,
        height: '400px',
        width: '100%',
    }
}

const Profile = () => {
    const hiddenCoverInput = useRef(null);
    const hiddenProfileInput = useRef(null);
    const { id } = useParams();
    const loggedIn_user = JSON.parse(localStorage.getItem('profile'))?.result;
    const users = useSelector((state) => state.users.users);
    //profile_user
    const user = useMemo(() => {
        return users.filter((user) => user._id === id);
    }, [users, id]);
    //profile_user-friends
    const allFriends = useMemo(() => {
        return users.filter(friend => user[0]?.friends.indexOf(friend._id) !== -1 && friend);
    }, [users, user]);
    //loggedIn_user_friends
    const loggedInUser = useMemo(() => {
        return users.filter(user => user._id === loggedIn_user?._id);
    }, [users, loggedIn_user]);
    //profile_user_already_friend
    const profile_user_already_friend = useMemo(() => {
        return loggedInUser[0]?.friends.indexOf(user[0]._id);
    }, [loggedInUser, user]);
    const coverImage = user[0]?.coverImage;
    const profileImage = user[0]?.profileImage;
    const [coverImageState, setCoverImageState] = useState(coverImage);
    const [profileImageState, setProfileImageState] = useState(profileImage);
    const dispatch = useDispatch();

    useEffect(() => {
        setCoverImageState(coverImage);
        setProfileImageState(profileImage);
    }, [coverImage, profileImage]);

    useEffect(() => {
        dispatch(getAllUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        setCoverImageState(coverImage || '');
        setProfileImageState(profileImage || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (coverImageState === '' && profileImageState === '') return;
        
        dispatch(updateUser({ coverImage: coverImageState, profileImage: profileImageState, id: user[0]?._id }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[coverImageState, profileImageState]);
 
    const handleProfileClick = () => {
        hiddenProfileInput.current.click();
    }

    const handleCoverClick = () => {
        hiddenCoverInput.current.click();
    }

    const readFile = (event) => {
        const files = event.target.files;
        let reader = new FileReader();
        reader.onload = function (fileLoadedEvent) {
            if (event.target.name === 'profile_image') {
                setProfileImageState(fileLoadedEvent.target.result);
            } else {
                setCoverImageState(fileLoadedEvent.target.result);
            }
        };
        if(files[0]) {
            // This does not return the text. It just starts reading.
            // The onload handler is triggered when it is done and the result is available.
            reader.readAsDataURL(files[0]);
        }
    }

    if (user.length === 0) return <CircularProgress size='large' />

    const addFriend = () => {
        dispatch(updateUserFriend({ loggedInUserId: loggedIn_user?._id, friendId: user[0]._id}));
    }

    return (
        <>
            <Header />
            <SideBar>
                <ClipperDrawer listArray={listArray} />
            </SideBar>
            <Main>
                <Box component='div' onClick={handleCoverClick} className='banner-image' sx={{ ...bannerImageStyle(coverImageState) }}>
                    {coverImageState === '' && (
                        <div className='cover_image_overlay'>Add a cover picture</div>
                    )}
                    <input
                        type="file"
                        disabled={loggedIn_user?._id === id ? false : true}
                        ref={hiddenCoverInput}
                        style={{ display: 'none' }}
                        onChange={readFile}
                    />
                </Box>
                <Box component='div' height='150px' position='relative'>
                    <div className="profile" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'absolute', left: 'calc(50% - 75px)', top: '-100px' }}>
                        <div className="profile-image" onClick={handleProfileClick} style={{ height: '150px', width: '150px', borderRadius: '100%', overflow: 'hidden', border: '5px solid floralwhite' }}>
                            {profileImageState === '' && (
                                <div className="profile_image_overlay">Add a profile picture</div>
                            )}
                            <input
                                name='profile_image'
                                type="file"
                                disabled={loggedIn_user?._id === id ? false : true}
                                ref={hiddenProfileInput}
                                style={{ display: 'none' }}
                                onChange={readFile}
                            />
                            <img src={profileImageState === '' ? image : profileImageState} alt="profile" height='100%' width='100%' />
                        </div>
                        <div className="profile-name" style={{ marginTop: '10px' }}>
                            <Typography variant='h5' fontWeight='bolder'>{user[0]?.username}</Typography>
                        </div>
                    </div>
                </Box>
                <Grid container>
                    <Grid item lg={8} md={12} sx={{ padding: '0 40px' }}>
                        <Posts />
                    </Grid>
                    <Grid item lg={4} md={12}>
                        {loggedIn_user?._id !== user[0]?._id && ( profile_user_already_friend === -1 && (
                            <div>
                                <Button variant='contained' onClick={addFriend} color='primary'>Unfollow</Button>
                            </div>
                        ))}
                        <div style={{ padding: '20px 0' }}>
                            <Typography variant='h6'>User Infromation</Typography>
                            <ul>
                                <li style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                    <h5>City:</h5>
                                    <span>Madrid</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                    <h5>From:</h5>
                                    <span>Berlin</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                    <h5>Relationship:</h5>
                                    <span>Single</span>
                                </li>
                            </ul>
                        </div>
                        <Grid item container rowGap={2} columnGap={4}>
                            {allFriends.length > 0 ? allFriends.map((friend) => (
                                <Grid component={Link} to={`/lookalike/profile/${friend._id}`} key={friend._id}>
                                    <div className="friend-image" style={{ height: '100px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
                                        <img src={friend.profileImage || image} width='100%' height='100%' alt="friend" />
                                    </div>
                                    <Typography variant='body1'>{friend.username}</Typography>
                                </Grid>
                            )) : <h5>You have not added any friends yet</h5>}
                        </Grid>
                    </Grid>
                </Grid>
            </Main>
        </>
    )
}

export default Profile;