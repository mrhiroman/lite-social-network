import React from 'react'
import styles from './PostComponent.module.sass'

import LikeEmpty from '../../../assets/img/icons/like_empty.png'
import LikeFull from '../../../assets/img/icons/like_full.png'
import EmptyAvatar from '../../../assets/img/icons/empty_avatar.png'
import { LikeModel, LikeService, PostModel } from '../../../generated/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

export const PostComponent = (props: {post: PostModel}) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const [hasLike, setHasLike] = React.useState(props.post.likes?.find(x => x.userId === currentUser?.id) !== undefined)
  const [likes, setLikes] = React.useState(props.post.likes);

  React.useEffect(() => {
    setHasLike(props.post.likes?.find(x => x.userId === currentUser?.id) !== undefined)
    setLikes(props.post.likes);
  }, [props.post.likes])

  const ChangeLike = () => {
    if(!hasLike){
      setLikes([...likes as LikeModel[], {userId: currentUser?.id, postId: props.post.id}])
      setHasLike(true)
      LikeService.getApiLikes(props.post.id as number)
    } else {
      setLikes(likes?.filter(l => l.userId !== currentUser?.id))
      setHasLike(false)
      LikeService.getApiLikesRemove(props.post.id as number)
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.avatar}>
        <img src={props.post.author?.avatarUrl !== '' ? props.post.author?.avatarUrl ?? EmptyAvatar : EmptyAvatar} alt='avatar'/>
      </div>
      <div className={styles.postInfo}>
        <div className={styles.author}>{props.post.author?.name}</div>
        <div className={styles.divisor} />
        <div className={styles.post}>{props.post.text}</div>
        <div className={styles.image}>
          {props.post.imageUrl ? <img src={props.post.imageUrl} alt='post'/> : ''}
        </div>
        <div className={styles.postBottom}>
          <div>{`${props.post.creationDate?.split('T')[0]} ${props.post.creationDate?.split('T')[1].split('.')[0]}`}</div>
          <div onClick={ChangeLike} className={styles.likes}>
            <img src={hasLike ? LikeFull : LikeEmpty} alt='like'/>
            {(likes as LikeModel[]).length}
          </div>
        </div>
      </div>
    </div>
  )
}
