import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import useEchoStore from '../useEchoStore';

const Comments = ({ beaconId, creatorId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { authUser } = useAuth();
    const { laravelEcho } = useEchoStore();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://hku6k67uqeuabts4pgtje2czy40gldpa.lambda-url.us-east-1.on.aws/api/beacons/${beaconId}/comments`, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + authUser,
                    },
                });
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();

        const channel = laravelEcho.channel(`beacon.${beaconId}`);
        channel.listen('.comment.created', (data) => {
            setComments(currentComments => [...currentComments, data.comment]);
        });
        channel.listen('.comment.deleted', (data) => {
            setComments(currentComments => currentComments.filter(comment => comment.id !== data.commentId));
        });

        return () => {
            laravelEcho.leave(`beacon.${beaconId}`);
        };
    }, [beaconId, laravelEcho, authUser]);

    const handlePostComment = async () => {
        try {
            const response = await fetch(`https://hku6k67uqeuabts4pgtje2czy40gldpa.lambda-url.us-east-1.on.aws/api/beacons/${beaconId}/comments`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + authUser,
                },
                body: JSON.stringify({ content: newComment }),
            });
            if (response.ok) {
                setNewComment('');
            } else {
                console.error('Failed to post comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`https://hku6k67uqeuabts4pgtje2czy40gldpa.lambda-url.us-east-1.on.aws/api/beacons/${beaconId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + authUser,
                },
            });
            if (!response.ok) {
                console.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className='bg-white relative w-full p-4'>
            <h1 className='text-2xl text-sky-950 text-center p-1'>Comment Section</h1>
            <div className='flex justify-center w-full'>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className='border-2 border-sky-950 p-1 flex-1 w-full left-0 self-center m-auto' />
                <button onClick={handlePostComment} className='rounded-full bg-sky-900 text-teal-50 text-xs px-3 py-1 text-md self-auto m-2 flex-none'>
                    Add Comment
                </button>
            </div>

            {comments.map((comment) => (
                <div className='border-2 border-teal-100 my-3 p-1 w-full mx-auto shadow-md' key={comment.id}>
                    <div className='comment-item'>
                        <img src={comment.user.avatar || 'default-profile-pic-url'} alt={comment.user.username} className='comment-user-profile-pic' />
                        <div className='comment-content'>
                            <p className='comment-user-name'>{comment.user.username}</p>
                            <p className='comment-text'>{comment.content}</p>
                            {(comment.user.id === authUser || creatorId === authUser) && (
                                <button className='delete-comment-button' onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;