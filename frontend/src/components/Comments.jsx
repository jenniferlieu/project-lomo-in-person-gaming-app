import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comment = ({ author, text, onDelete }) => {
    return (
        <div>
            <h3>{author}</h3>
            <p>{text}</p>
            <button onClick={onDelete}>
                X
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
        <div className='bg-white relative w-full p-2'>
            <h1 className='text-2xl text-sky-950 text-center'>Comment Section</h1>
            <div classname='flex justify-center w-full'>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className='border-2 border-sky-950 w-11/12 left-0 self-center m-auto'/>
                <button onClick={addComment} className='rounded-full bg-sky-900 text-teal-50 px-3 py-1 text-md self-auto m-2'>
                    +
                </button>
            </div>

            {comments.map((comment) => (
                <Comment key={comment.id} text={comment.text} onDelete={() => deleteComment(comment.id)} />
            ))}
                      
        </div>
    );
}

export default CommentSection;