import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PostAuthor } from './postAuthor';

export const PostsList = () => {
    const posts = useSelector(state => state.posts);

    const renderedPosts = posts.map(post => (
        <article className="post-excerpt">
            <h3>{post.title}</h3>
            <PostAuthor />
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post 
            </Link>
        </article>
    ));

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
}