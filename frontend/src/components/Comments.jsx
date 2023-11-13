import React, { useState } from 'react';

const Comment = ({ author, text, onDelete }) => {
    return (
        <div>
            <h3>{author}</h3>
            <p>{text}</p>
            <button onClick={onDelete} className='rounded-full bg-sky-700 text-teal-50 text-xs px-3 py-1 text-md self-auto m-2 flex-none'>
                Delete
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
        <div className='bg-white relative w-full p-4'>
            <h1 className='text-2xl text-sky-950 text-center'>Comment Section</h1>
            <div classname='flex justify-center w-full'>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className='border-2 border-sky-950 p-1 flex-1 w-full left-0 self-center m-auto'/>
                <button onClick={addComment} className='rounded-full bg-sky-900 text-teal-50 text-xs px-3 py-1 text-md self-auto m-2 flex-none'>
                    Add Comment
                </button>
            </div>

            {comments.map((comment) => (
                <div className='border-2 border-teal-100 my-3 p-1 w-full mx-auto shadow-md'>
                    <Comment key={comment.id} text={comment.text} onDelete={() => deleteComment(comment.id)} />
                </div>
            ))}
                      
        </div>
    );
}

export default CommentSection;