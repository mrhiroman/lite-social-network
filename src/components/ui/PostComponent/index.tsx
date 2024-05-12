import React from 'react';
import styles from './PostComponent.module.sass';

import LikeEmpty from '../../../assets/img/icons/like_empty.png';
import LikeFull from '../../../assets/img/icons/like_full.png';
import EmptyAvatar from '../../../assets/img/icons/empty_avatar.png';
import {
	LikeModel,
	LikeService,
	PostModel,
	PostService,
	UserService,
} from '../../../generated/api';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { setEditPostModalModel, setEditPostModalStatus } from '../../../redux/modals/slice';
import { Formik } from 'formik';
import { setCurrentUser, setRenderedUser } from '../../../redux/user/slice';

export const PostComponent = (props: { post: PostModel; isOwnPost: boolean }) => {
	const dispatch = useAppDispatch();

	const modalOpened = useSelector((state: RootState) => state.modals.editPostModalOpened);
	const currentUser = useSelector((state: RootState) => state.user.currentUser);
	const currentPost = useSelector((state: RootState) => state.modals.editPostModalModel);
	const [hasLike, setHasLike] = React.useState(
		props.post.likes?.find((x) => x.userId === currentUser?.id) !== undefined,
	);
	const [likes, setLikes] = React.useState(props.post.likes);

	const initialValues = { text: props.post.text };

	React.useEffect(() => {
		setHasLike(props.post.likes?.find((x) => x.userId === currentUser?.id) !== undefined);
		setLikes(props.post.likes);
	}, [props.post.likes]);

	const ChangeLike = () => {
		if (!hasLike) {
			setLikes([
				...(likes as LikeModel[]),
				{ userId: currentUser?.id, postId: props.post.id },
			]);
			setHasLike(true);
			LikeService.getApiLikes(props.post.id as number);
		} else {
			setLikes(likes?.filter((l) => l.userId !== currentUser?.id));
			setHasLike(false);
			LikeService.getApiLikesRemove(props.post.id as number);
		}
	};

	const EditPostClick = () => {
		dispatch(setEditPostModalModel(props.post));
		dispatch(setEditPostModalStatus(true));
	};

	const DeletePostClick = () => {
		if (window.confirm('Delete post? This is irreversible!')) {
			PostService.getApiPostsRemove(props.post.id!).then((resp) => {
				UserService.getApiUsersMe().then((response) => {
					dispatch(setCurrentUser({ ...response }));
					dispatch(setRenderedUser({ ...response }));
				});
			});
		}
	};

	return (
		<div className={styles.layout}>
			<div className={styles.avatar}>
				<img
					src={
						props.post.author?.avatarUrl !== ''
							? props.post.author?.avatarUrl ?? EmptyAvatar
							: EmptyAvatar
					}
					alt="avatar"
				/>
			</div>
			<div className={styles.postInfo}>
				<div className={styles.author}>{props.post.author?.name}</div>
				<div className={styles.divisor} />
				<div className={styles.post}>{props.post.text}</div>
				<div className={styles.image}>
					{props.post.imageUrl ? <img src={props.post.imageUrl} alt="post" /> : ''}
				</div>
				<div className={styles.postBottom}>
					<div>{`${props.post.creationDate?.split('T')[0]} ${
						props.post.creationDate?.split('T')[1].split('.')[0]
					}`}</div>
					<div className={styles.miscWrap}>
						<div onClick={ChangeLike} className={styles.likes}>
							<img src={hasLike ? LikeFull : LikeEmpty} alt="like" />
							{(likes as LikeModel[]).length}
						</div>
					</div>
				</div>
				{props.isOwnPost && (
					<div className={styles.miscWrap}>
						<div className={styles.edit}>
							<Button text="Edit" onClick={EditPostClick} />
						</div>
						<div className={styles.edit}>
							<Button text="Delete" onClick={DeletePostClick} />
						</div>
					</div>
				)}
			</div>
			{modalOpened && (
				<Modal
					name="Edit info"
					onModalClose={() => {
						dispatch(setEditPostModalStatus(false));
					}}>
					<Formik
						initialValues={{ text: currentPost.text }}
						validate={(values) => {
							const errors: Partial<typeof values> = {};
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							console.log(values.text, currentPost.id);
							PostService.postApiPostsUpdate(currentPost.id!, {
								text: values.text,
								image: '',
							}).then((response) => {
								dispatch(setEditPostModalStatus(false));
								UserService.getApiUsersMe().then((response) => {
									dispatch(setCurrentUser({ ...response }));
									dispatch(setRenderedUser({ ...response }));
								});
							});
						}}>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<form onSubmit={handleSubmit}>
								<input
									placeholder="Updated Text"
									type="text"
									name="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.text as string}
								/>
								<div className={styles.errors}>
									{errors.text && touched.text && errors.text}
								</div>
								<Button onClick={handleSubmit} text="Update!" />
							</form>
						)}
					</Formik>
				</Modal>
			)}
		</div>
	);
};
