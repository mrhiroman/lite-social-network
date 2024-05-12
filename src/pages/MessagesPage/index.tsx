import { useSelector } from 'react-redux';
import styles from './MessagesPage.module.sass';
import { RootState } from '../../redux/store';
import { MessageBox } from './MessageBox';

export const MessagesPage = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className={styles.layout}>
      <div className={styles.caption}>Messages</div>
      <div className={styles.block}>
        <div className={styles.userList}>
          Friends
          {currentUser?.friends?.map((friend) => (
            <div className={styles.friend}>
              <div className={styles.avatar}>
                <img src={friend.avatarUrl ?? ''} alt="avatar" />
              </div>
              <div className={styles.name}>{friend.name}</div>
            </div>
          ))}
        </div>
        <div className={styles.messageBox}>
          <MessageBox />
        </div>
      </div>
    </div>
  );
};
