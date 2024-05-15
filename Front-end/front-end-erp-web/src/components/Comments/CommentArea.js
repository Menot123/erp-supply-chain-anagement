import React, { useState } from 'react'
import { Input } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl'
const { TextArea } = Input;

export const CommentArea = ({ handleSubmitComment, submitLabel, hasCancelButton = false, initialText = '',
    handleCancelEdit
}) => {

    const [commentInput, setCommentInput] = useState(initialText)
    const isHaveContentComment = commentInput.length === 0
    const intl = useIntl();

    const onSubmitForm = e => {
        e.preventDefault()
        handleSubmitComment(commentInput)
        setCommentInput('')
    }

    return (
        <form onSubmit={onSubmitForm} className='form-comment-area mb-4'>
            <TextArea
                className='input-text-comment'
                showCount
                value={commentInput}
                maxLength={100}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder={intl.formatMessage({ id: "comment-quote-input.place-holder" })}
                style={{
                    height: 80,
                    resize: 'none',
                }}
            />
            <button className='btn btn-main btn-submit-comment mt-2' disabled={isHaveContentComment}>{submitLabel}</button>
            {hasCancelButton &&
                <button className='btn btn-primary btn-cancel-edit  mt-2 ms-2' onClick={handleCancelEdit}>Cancel</button>
            }
        </form>
    )
}
