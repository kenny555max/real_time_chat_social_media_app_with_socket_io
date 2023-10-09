import { Grid } from '@mui/material';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getAllPosts } from '../../../actions';
import Media from './Media';
import { useEffect, useMemo, useRef } from 'react';

const Posts = () => {
    //const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
    const socket = useSelector((state) => state.users.socket)
    // Access the query client to invalidate the query
    //const queryClient = useQueryClient();
    const elementRef = useRef(null);
    // Define a query key based on the 'posts' value
    const queryKey = useMemo(() => ['fetch_all_posts', posts], [posts]); // Include 'posts' in the query key

    const { data: fetched_posts, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            try {
                const posts = await getAllPosts();

                return posts;
            } catch (error) {
                console.log(error);
            }  
        },
        staleTime: 1000000
    });

    // When 'posts' value changes in the Redux state, invalidate the query
    /**
    useEffect(() => {
        queryClient.invalidateQueries(queryKey);
    }, [posts, queryClient, queryKey]);
    */
    
    // Function to scroll the element back to the top (or zero)
    const scrollTop = () => {
       // if (elementRef.current.scrollTop > 0) {
            elementRef.current.scrollTo({
                top: 0,
                behavior: 'smooth', // Add smooth scrolling behavior
            });
        //}
    };

    useEffect(() => {
        if (!socket) return;

        // Listen for changes from the server
        socket.on('dataChange', (change) => {
            // Update your data or trigger a re-fetch as needed
            console.log(change);

            refetch();
        });
    },[socket, refetch]);
    
    
    if (isLoading) {
        // Render loading indicators (e.g., Media components) while data is loading
        return [1, 2].map((item, index) => <Media key={index} />);
    }

    // Check if 'posts' is defined before mapping over it
    if (!fetched_posts) {
        return null; // or render a different message or component
    }

    return (
        <Grid container rowGap={4} ref={elementRef}>
            {
                fetched_posts.map((item, index) => {
                    return <Post key={index} post={item} />
                })
            }
        </Grid>
    )
}

export default Posts;