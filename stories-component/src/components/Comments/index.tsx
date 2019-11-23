import './index.css';
import React, { useEffect, useState } from 'react';
import { Comment } from '../Comment';
import { useStore } from '../StoreProvider';

import { getComments, postComment } from '../../services/api';

interface Props {
  storyId: number;
  user: User | null;
}

export const Comments: React.FC<Props> = ({ storyId, user }) => {
  const { state, dispatch } = useStore();
  const { commentsVisible, comments } = state;
  const openComments = () => dispatch({ type: 'openComments' });
  const closeComments = () => dispatch({ type: 'closeComments' });

  const [comment, setComment] = useState<undefined | string>();

  useEffect(() => {
    async function loadComments() {
      const res = await getComments(storyId);
      dispatch({ type: 'setComments', comments: res });
    }

    loadComments();

  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && comment && user) {
      await postComment(user, comment, storyId)

      const newComment = {
        content: comment,
        author: {
          avatarUrl: user.picture,
          id: user.id,
          name: user.name
        },
        createdAt: 'date'
      }

      dispatch({ type: 'appendComment', newComment });
      setComment('')
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const commentForm = (num: number) => {
    const n = num % 10

    if (n === 1) return 'комментарий'
    if (n > 1 && n <= 4) return 'комментария'
    return 'комментариев'
  }

  return !commentsVisible ? (
    <div
      onClick={openComments}
      className='Comments Comments_Type_Collapsed'
    >
      {comments.length} {commentForm(comments.length)}
    </div>
  ) : (
      <div className='Comments Comments_Type_Expand'>
        <div className='Comments-Header'>
          <div className='Comments-HeaderTitle'>Комментарии</div>
          <div className='Comments-Avatar'>
            <div className='Comments-AvatarElem' />
            <div className='Comments-AvatarElem' />
            <div className='Comments-AvatarElem' />
          </div>
          <div className='Comments-CommentsCount'>623</div>
          <div onClick={closeComments} className='Comments-Arrow' />
        </div>
        <div className='Comments-Row'>
          {comments.map((comment, i) => (
            <Comment key={i} {...comment} />
          ))}
        </div>
        <div className='Comments-Top'>
          <div className='Avatar' />
          <input className='Comments-Input' type="text" onKeyDown={handleKeyDown} onChange={handleChange} placeholder='Комментировать' value={comment} />
          <div className='Comments-Emoji'>
            <div className='Emoji'>😭</div>
            <div className='Emoji'>😭</div>
            <div className='Emoji'>😭</div>
            <div className='Emoji'>😭</div>
          </div>
        </div>
        <div className='Comments-Bottom'>
          <div className='Comments-Emoji'>
            <div className='Emoji Emoji_Type_Small'>😭</div>
            <div className='Emoji Emoji_Type_Small'>😭</div>
            <div className='Emoji Emoji_Type_Small'>😭</div>
          </div>
          <div className='Comments-History'>154 комментария</div>
          <div className='Comments-Answers'>12 ответов</div>
          <div className='Comments-Dots' />
        </div>
      </div>
    );
};
