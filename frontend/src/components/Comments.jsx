import React, { useState, useEffect } from 'react';

const Comment = ({ text, onDelete }) => {
    return (
        <div>
            <p>{text}</p>
            <button onClick={onDelete} className='rounded-full bg-sky-700 text-teal-50 text-xs px-3 py-1 text-md self-auto m-2 flex-none'>
                Delete
            </button>
        </div>
    );
}

const CommentSection = ({ beaconId }) => {
    // Initialize comments from localStorage or an empty array if no data is present
    const [comments, setComments] = useState(() => {
        const storedComments = localStorage.getItem(`comments_${beaconId}`);
        return storedComments ? JSON.parse(storedComments) : [];
    });
    const [newComment, setNewComment] = useState('');

    // Save comments to localStorage whenever comments change
    useEffect(() => {
        localStorage.setItem(`comments_${beaconId}`, JSON.stringify(comments));
    }, [comments]);

    const addComment = () => {
        const updatedComments = [
            ...comments,
            { id: comments.length + 1, text: newComment },
        ];
        setComments(updatedComments);
        setNewComment('');
    };

    const deleteComment = (id) => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
    };

    return (
        <div className='bg-white relative w-full p-4'>
            <h1 className='text-2xl text-sky-950 text-center p-1'>Comment Section</h1>
            <div className='flex justify-center w-full'>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className='border-2 border-sky-950 p-1 flex-1 w-full left-0 self-center m-auto' />
                <button onClick={addComment} className='rounded-full bg-sky-900 text-teal-50 text-xs px-3 py-1 text-md self-auto m-2 flex-none'>
                    Add Comment
                </button>
            </div>

            {comments.map((comment) => (
                <div className='border-2 border-teal-100 my-3 p-1 w-full mx-auto shadow-md'>
                    <Comment 
                        key={comment.id}
                        text={comment.text}
                        onDelete={() => deleteComment(comment.id)}
                    />
                </div>
            ))}

        </div>
    );
}

export default CommentSection;