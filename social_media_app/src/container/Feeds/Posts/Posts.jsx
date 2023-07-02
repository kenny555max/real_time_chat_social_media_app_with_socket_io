import { CircularProgress, Grid } from '@mui/material';
import Post from './Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getAllPosts } from '../../../actions';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const allPosts = useMemo(() => {
        return posts;
    }, [posts]);

    useEffect(() => {
        dispatch(getAllPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    if (allPosts.length === 0) return <div><CircularProgress /></div>

    return (
        <Grid container rowGap={4}>
            {allPosts.map((item, index) => {
                return <Post key={index} post={item} />
            })}
        </Grid>
    )
}

export default Posts;