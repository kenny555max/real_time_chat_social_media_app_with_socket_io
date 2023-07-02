import { Grid, Card, CardHeader, CardMedia, CardActions, Button, CardContent, Avatar, IconButton, Typography, Paper } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PropTypes from 'prop-types';
import moment from 'moment';
import Collapse from '@mui/material/Collapse';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { createComment, getAllComments, updatePost } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';

const includeUser = (friends, loggedIn_user) => {
    const isUser = friends.filter(user => user.userId === loggedIn_user?._id);

    return isUser;
}

const taggedFriends = (loggedIn_user, post_user) => {
    if (post_user.friendsTagged.length === 0) {
        return post_user.username;
    } else {
        return `${post_user.username} is with ${includeUser(post_user.friendsTagged, loggedIn_user).length > 0
                ? `${post_user.friendsTagged.length > 1
                            ? `You and ${post_user.friendsTagged.length - 1} ${(post_user.friendsTagged.length - 1) > 1 ? 'others' : 'other'}`
                        : 'You'
                    }`
                : `${post_user.friendsTagged.length > 1
                        ? `${ post_user.friendsTagged[0].username } and ${ post_user.friendsTagged.length - 1 } 
                        ${ (post_user.friendsTagged.length - 1) > 1 ? 'others' : 'other' }`
                        : `${ post_user.friendsTagged[0].username }`
                    }`
            }`
    }
}

const Post = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    const [commentData, setCommentData] = useState({
        comment: ''
    });
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const commentState = useSelector((state) => state.comments.comments);
    //const comments = useMemo(() => {
      //  return commentState.filter(comment => comment.postId === post._id);
    //}, [commentState, post._id]);
    const [likeCount, setLikeCount] = useState(post.like.length);
    
    useEffect(() => {
        getAllComments()
            .then((data) => {
                setComments([...data.filter(comment => comment.postId === post._id)]);
            })
            .catch((error) => console.log(error))
    },[post._id, commentState]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const makeComment = () => {
        if (commentData.comment === '') return;

        dispatch(createComment({ ...commentData, username: user.username, userImage: user.profileImage, userId: user._id, postId: post._id }));

        setCommentData({
            comment: ''
        })
    }

    const likePost = () => {
        const userLiked = post.like.find(likeId => likeId === user?._id);
        
        if (userLiked) {
            post.like = post.like.filter(like => like !== user._id);
            setLikeCount(post.like.length);
        } else {
            post.like.push(user._id);
            setLikeCount(post.like.length);
        }

        dispatch(updatePost({ userId: user._id, postid: post._id }));
    }

  return (
    <Grid item xs={12}>
        <Paper elevation={6}>
            <Card>
                <CardHeader
                    avatar={
                          <Avatar
                              aria-label="profile"
                              component={Link}
                              to={`/lookalike/profile/${post.userId}`}
                              src={post.userImage} />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={taggedFriends(user, post)}
                    subheader={moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                />
                <div style={{ padding: '20px' }}>
                    <Typography variant='body1'>{post.text}</Typography>
                </div>
                <CardMedia
                    component="img"
                    height="500"
                    image={post.selectedFile}
                    alt="Paella dish"
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant='h5'>Comments:</Typography>
                        {comments.map((comment, index) => {
                            return <List key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar component={Link} to={`/lookalike/profile/${comment.userId}`} src={comment.userImage} />
                                    </ListItemAvatar>
                                    <ListItemText primary={comment.username} secondary={comment.comment} />
                                </ListItem>
                            </List>
                        })}
                        <div className='add_comment' style={{ display: 'flex' }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Add Comment"
                                fullWidth
                                value={commentData.comment}
                                name='comment'
                                onChange={(e) => setCommentData({ ...commentData, [e.target.name]: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                              <IconButton
                                  color='inherit'
                                  onClick={makeComment}
                                  sx={{ backgroundColor: 'blue', color: 'floralwhite' }}>
                                <SendIcon />
                            </IconButton>  
                        </div>
                    </CardContent>
                </Collapse>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={likePost} aria-label="add to favorites" size='small' sx={{ backgroundColor: 'blue', color: 'floralwhite' }}>
                            <ThumbUpIcon />
                        </IconButton>
                        <Typography variant='body1'>{likeCount} people like it</Typography>
                    </div>
                    <Button onClick={handleExpandClick} aria-label="share">
                        {comments.length}
                        {"  "}  
                        comments
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    </Grid>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post;