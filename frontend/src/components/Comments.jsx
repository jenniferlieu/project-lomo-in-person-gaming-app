import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comment = ({ author, text, onDelete }) => {
    return (
        <div>
            <h3>{author}</h3>
            <p>{text}</p>
            <button onClick={onDelete}>
                <FontAwesomeIcon icon='trash' />
            </button>
        </div>
    );
}

const CommentSection = () => {
    const [comments, setComments] = useState([
        { id: 1, text: 'Comment 1' },
        { id: 2, text: 'Comment 2' },
    ]);
    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        setComments([...comments, { id: comments.length + 1, text: newComment }]);
        setNewComment('');
    };

    const deleteComment = (id) => {
        setComments(comments.filter((comment) => comment.id !== id));
    };

    return (
        <div>
            <h1>Comment Section</h1>
            {comments.map((comment) => (
                <Comment key={comment.id} text={comment.text} onDelete={() => deleteComment(comment.id)} />
            ))}
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <button onClick={addComment}>Add Comment</button>
        </div>
    );
}

export default CommentSection;