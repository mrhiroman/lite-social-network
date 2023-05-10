import React from 'react'
import styles from './NewsPage.module.sass'
import { PostComponent } from '../../components/ui/PostComponent'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { PostService } from '../../generated/api'
import { setNews } from '../../redux/posts/slice'


export const NewsPage = () => {
    const dispatch = useAppDispatch()
    const news = useSelector((state: RootState) => state.posts.news)

    React.useEffect(() => {
        PostService.getApiPostsNews()
        .then(response => {
            dispatch(setNews(response))
            console.log(response)
        })
    }, [])

    return (
    <div className={styles.layout}>
        <div className={styles.caption}>News</div>
        <div className={styles.posts}>
            {news.map((post, i) => <PostComponent post={post} key={i} />)}
        </div>
        {news.length == 0 && <div className={styles.nofriends}>Zero news for you cause you don't have any friends. :( </div>}
    </div>
  )
}
