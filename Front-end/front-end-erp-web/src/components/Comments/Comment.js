import React from 'react'
import user_icon from './user-icon.png'
import './Comment.scss'
import { CommentArea } from './CommentArea'
import { FormattedMessage } from 'react-intl'

export const Comment = ({ comment, replies, currentUserId, handleDeleteComment,
    activeComment, updateComment, setActiveComment, parentId = null, addComment }) => {

    const canReply = Boolean(currentUserId)
    const canEdit = +currentUserId === +comment.userId
    const canDelete = +currentUserId === +comment.userId
    const isReplying = activeComment && activeComment.type === 'replying'
        && +activeComment?.id === +comment.id
    const isEditing = activeComment && activeComment.type === 'editing'
        && +activeComment?.id === +comment.id
    const relyId = parentId ? parentId : comment?.id


    const formattedDate = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDate = `${hours}:${minutes}:${seconds}, ${day} thg ${month}, ${year}`;
        return formattedDate
    }
    const formatCreatedAt = formattedDate(new Date(comment.createdAt))

    return (
        <div className='wrapper-comment'>
            <div className='avatar-comment'>
                <img className='avatar-comment-element' alt='avatar-comment' src={user_icon} />
            </div>
            <div className='content-comment-right'>
                <div className='comment-content'>
                    <div className='wrapper-author-createdAt'>
                        <div className='author-comment'>
                            <h5>{comment?.username}</h5>
                        </div>
                        <div className='comment-createdAt'>{formatCreatedAt}</div>
                    </div>
                    {!isEditing && <div className='comment-text'>{comment?.body}</div>}
                    {isEditing &&
                        (
                            <CommentArea submitLabel={'Update'} initialText={comment?.body}
                                handleSubmitComment={(content) => updateComment(content, comment?.id)}
                                handleCancelEdit={() => setActiveComment(null)}
                                hasCancelButton
                            ></CommentArea>
                        )}
                    <div className='btn-actions-comment'>
                        {canReply && <div className='comment-action hover-item' onClick={() => setActiveComment({ id: comment?.id, type: 'replying' })}><FormattedMessage id="comment-quote-input.btn-reply" /></div>}
                        {canEdit && <div className='comment-action hover-item' onClick={() => setActiveComment({ id: comment?.id, type: 'editing' })}><FormattedMessage id="comment-quote-input.btn-edit" /></div>}
                        {canDelete && <div className='comment-action hover-item'
                            onClick={() => handleDeleteComment(comment?.id)}
                        ><FormattedMessage id="comment-quote-input.btn-delete" /></div>}
                    </div>

                    {
                        isReplying && (
                            <CommentArea
                                submitLabel='Reply'
                                handleSubmitComment={(content) => addComment(content, relyId)}
                            />
                        )
                    }

                    {replies && replies.length > 0 &&
                        <div className='replies'>
                            {replies.map((reply, index) => {
                                return (
                                    <Comment key={reply.id} comment={reply} replies={[]}
                                        currentUserId={currentUserId}
                                        handleDeleteComment={() => handleDeleteComment(reply?.id)}
                                        addComment={addComment}
                                        parentId={comment?.id}
                                        activeComment={activeComment}
                                        setActiveComment={setActiveComment}
                                        updateComment={updateComment}

                                    />
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
