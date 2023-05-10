import React from 'react'
import styles from './FriendsPage.module.sass'
import { FriendCard } from '../../components/ui/FriendCard'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { FriendService } from '../../generated/api'


export const FriendsPage = () => {
    const dispatch = useAppDispatch()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    return (
    <div className={styles.layout}>
        <div className={styles.caption}>Friend List</div>
        <div className={styles.friends}>
            {currentUser?.friends?.map((friend) => <FriendCard user={friend} key={friend.id} />)}
        </div>
        {currentUser?.friends?.length == 0 && <div className={styles.nofriends}>You don't have any friends. :( </div>}
    </div>
  )
}
