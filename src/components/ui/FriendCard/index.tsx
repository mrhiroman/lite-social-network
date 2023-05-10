import React from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './FriendCard.module.sass'
import EmptyAvatar from '../../../assets/img/icons/empty_avatar.png'
import { Button } from '../Button'
import { FriendService, UserModel, UserService } from '../../../generated/api'
import { useAppDispatch } from '../../../redux/store'
import { setCurrentUser } from '../../../redux/user/slice'

export const FriendCard = (props: {user: UserModel}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const VisitFriend = () => {
        navigate(`/profile/${props.user.id}`)
    }

    const RemoveFriend = () => {
        FriendService.getApiFriendsRemove(props.user.id as number)
        .then(response => {
            console.log('removed friend')
            UserService.getApiUsersMe()
            .then(response => {
                dispatch(setCurrentUser({...response}))
            })
        })
        .catch(err => alert(err))
    }

    return (
        <div className={styles.layout}>
            <div onClick={VisitFriend}  className={styles.avatar}>
                <img src={props.user.avatarUrl !== '' ? props.user.avatarUrl ?? EmptyAvatar : EmptyAvatar} alt='avatar'/>
            </div>
            <div onClick={VisitFriend} className={styles.name}>{props.user.name}</div>
            <Button text='Remove Friend' color='#DF2935' hoverColor='#8f232a' onClick={RemoveFriend}/>
        </div>
  )
}
