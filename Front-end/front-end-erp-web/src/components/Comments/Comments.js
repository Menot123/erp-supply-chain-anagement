import React, { useEffect, useState } from 'react'
import { Comment } from './Comment'
import { CommentArea } from './CommentArea'
import './Comments.scss'
import { useSelector } from 'react-redux';
import { getComments, createAComment, editComment, deleteComment } from '../../services/saleServices'
import { FormattedMessage } from 'react-intl'

export const Comments = (props) => {

    const [dataComments, setDataComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    const commentRoots = dataComments.filter(comment => comment.parentId === null)
    const userId = useSelector(state => state.user.id)
    const lastName = useSelector(state => state.user?.lastName)
    const firstName = useSelector(state => state.user?.firstName)

    const fullName = (firstName ?? "") + " " + lastName

    const getCommentsReply = (commentId) => {
        return dataComments.filter(comment => +comment.parentId === +commentId).sort((a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    }

    const fetchComments = async () => {
        let res = await getComments(props?.quoteId)

        if (res && res.EC === 0 && res?.DT.length > 0) {
            setDataComments(res?.DT)
        }
    }

    const addComment = async (content, parentId = null) => {
        const dataComment = {
            quoteId: props?.quoteId,
            body: content,
            parentId,
            userId: userId ? userId : 100,
            username: fullName,
            createdAt: new Date().toISOString(),
        }
        let res = await createAComment(dataComment)
        if (res.EC === 0) {
            fetchComments()
            setActiveComment(null)
        }
    }

    const deleteCommentById = async (idComment) => {
        if (window.confirm('Are you sure you want to delete this comment ?')) {
            let res = await deleteComment(idComment)
            if (res && res?.EC === 0) {
                fetchComments()
            }
        }
    }

    const handleUpdateComment = async (content, commentId) => {
        let res = await editComment(content, commentId)
        if (res && res.EC === 0) {
            fetchComments()
            setActiveComment(null)
        }

    }

    useEffect(() => {
        fetchComments()
    }, [props?.quoteId])

    return (
        <div className='wrapper-comments'>
            <CommentArea submitLabel={<FormattedMessage id="comment-quote-input.btn-comment" />} handleSubmitComment={addComment} />
            <div className='comments-container'>
                {commentRoots && commentRoots.length > 0 &&
                    commentRoots.map((commentRoot, index) => {
                        return (
                            <Comment key={commentRoot.id}
                                comment={commentRoot}
                                replies={getCommentsReply(commentRoot.id)}
                                currentUserId={userId}
                                handleDeleteComment={deleteCommentById}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                addComment={addComment}
                                updateComment={handleUpdateComment}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
