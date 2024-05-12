import React from 'react';
import styles from './ProfilePage.module.sass';
import { Button } from '../../components/ui/Button';
import { PostComponent } from '../../components/ui/PostComponent';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';

import EmptyAvatar from '../../assets/img/icons/empty_avatar.png';
import { RootState, useAppDispatch } from '../../redux/store';
import { FriendService, PostModel, PostService, UserModel, UserService } from '../../generated/api';
import { useSelector } from 'react-redux';
import { setAvatarImage, setCurrentUser, setRenderedUser } from '../../redux/user/slice';
import { setPostText, setPosts, setSelectedImage } from '../../redux/posts/slice';
import { Modal } from '../../components/ui/Modal';
import { setEditModalStatus } from '../../redux/modals/slice';

export const ProfilePage = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const postText = useSelector((state: RootState) => state.posts.postText);
	const postImage = useSelector((state: RootState) => state.posts.selectedImage);

	const currentUser = useSelector((state: RootState) => state.user.currentUser);
	const renderedUser = useSelector((state: RootState) => state.user.renderedUser);
	const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
	const avatarImage = useSelector((state: RootState) => state.user.avatarImage);

	const posts = useSelector((state: RootState) => state.posts.posts);

	const modalOpened = useSelector((state: RootState) => state.modals.editModalOpened);

	const UploadPost = () => {
		PostService.postApiPosts({ image: postImage ?? '', text: postText })
			.then((response) => {
				PostService.getApiPosts(renderedUser?.id as number).then((response) => {
					console.log(response);
					dispatch(setPosts(response));
				});
			})
			.catch((err) => alert(err));
	};

	const UploadAvatar = () => {
		UserService.postApiUsersUploadAvatar(avatarImage)
			.then((response) => {
				UserService.getApiUsersMe().then((response) => {
					dispatch(setCurrentUser({ ...response }));
					dispatch(setRenderedUser({ ...response }));
				});
			})
			.catch((err) => alert('Error uploading avatar! Try another image..'));
	};

	const AddFriend = () => {
		FriendService.getApiFriends(renderedUser?.id as number)
			.then((response) => {
				console.log('added friend');
				UserService.getApiUsersMe().then((response) => {
					dispatch(setCurrentUser({ ...response }));
				});
			})
			.catch((err) => alert(err));
	};

	const RemoveFriend = () => {
		FriendService.getApiFriendsRemove(renderedUser?.id as number)
			.then((response) => {
				console.log('removed friend');
				UserService.getApiUsersMe().then((response) => {
					dispatch(setCurrentUser({ ...response }));
				});
			})
			.catch((err) => alert(err));
	};

	React.useEffect(() => {
		if (params.id) {
			UserService.getApiUsers(parseInt(params.id)).then((response) => {
				console.log(response);
				dispatch(setRenderedUser({ ...response }));
				PostService.getApiPosts(response.id as number).then((response) => {
					console.log(response);
					dispatch(setPosts(response));
				});
			});
		} else {
			if (currentUser) {
				dispatch(setRenderedUser({ ...currentUser }));
				PostService.getApiPosts(currentUser.id as number).then((response) => {
					console.log(response);
					dispatch(setPosts(response));
				});
			}
		}
	}, [params, currentUser]);

	const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			var baseString;
			reader.onloadend = function () {
				baseString = reader.result;
				dispatch(setSelectedImage(baseString as string));
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	const onAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			var baseString;
			reader.onloadend = function () {
				baseString = reader.result;
				dispatch(setAvatarImage(baseString as string));
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	return (
		<div className={styles.layout}>
			<div className={styles.profileWindow}>
				<div className={styles.leftSide}>
					<div className={styles.avatar}>
						<img
							src={
								renderedUser?.avatarUrl !== ''
									? renderedUser?.avatarUrl ?? EmptyAvatar
									: EmptyAvatar
							}
							alt="avatar"
						/>
					</div>
					{renderedUser?.id !== currentUser?.id &&
						currentUser?.friends?.every((f) => f.id !== renderedUser?.id) && (
							<Button text="Friend" onClick={AddFriend} />
						)}
					{renderedUser?.id !== currentUser?.id &&
						currentUser?.friends?.some((f) => f.id === renderedUser?.id) && (
							<Button text="Unfriend" onClick={RemoveFriend} />
						)}
				</div>
				<div className={styles.info}>
					<div className={styles.name}>{renderedUser?.name ?? 'Unknown'}</div>
					<div className={styles.divisor} />
					<div className={styles.other}>
						<div>City: {renderedUser?.city}</div>
						<div>Age: {renderedUser?.age}</div>
						<div>Education: {renderedUser?.education}</div>
					</div>
					{renderedUser?.id === currentUser?.id && (
						<Button text="Edit" onClick={() => dispatch(setEditModalStatus(true))} />
					)}
					{renderedUser?.id === currentUser?.id && (
						<>
							<input
								type="file"
								name="myImage"
								onChange={onAvatarChange}
								accept="image/*"
							/>
							<Button text="Update Avatar" onClick={UploadAvatar} />
						</>
					)}
				</div>
			</div>
			{renderedUser?.id === currentUser?.id && (
				<div className={styles.addPostWindow}>
					<div className={styles.addPostCaption}>Add a Post</div>
					<div className={styles.addPostForm}>
						<textarea
							style={{ resize: 'none' }}
							onChange={(event) => dispatch(setPostText(event.target.value))}
						/>
						Image:
						<input
							type="file"
							name="myImage"
							onChange={onImageChange}
							accept="image/*"
						/>
						<Button text="Post!" onClick={UploadPost} />
					</div>
				</div>
			)}
			<div className={styles.postsWindow}>
				<div className={styles.caption}>My Posts</div>
				<div className={styles.posts}>
					{posts.map((post, i) => (
						<PostComponent
							post={post}
							key={i}
							isOwnPost={renderedUser?.id === currentUser?.id}
						/>
					))}
				</div>
			</div>
			{modalOpened && (
				<Modal
					name="Edit info"
					onModalClose={() => {
						dispatch(setEditModalStatus(false));
					}}>
					<Formik
						initialValues={{
							name: currentUser?.name,
							age: currentUser?.age,
							city: currentUser?.city,
							education: currentUser?.education,
						}}
						validate={(values) => {
							const errors: Partial<typeof values> = {};
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							UserService.postApiUsersUpdate({
								name: values.name,
								age: values.age,
								city: values.city,
								education: values.education,
							}).then((response) => {
								console.log(response);
								dispatch(setEditModalStatus(false));
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
									placeholder="Name"
									type="text"
									name="name"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name as string}
								/>
								<div className={styles.errors}>
									{errors.name && touched.name && errors.name}
								</div>
								<input
									placeholder="Age"
									type="number"
									name="age"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.age}
								/>
								<div className={styles.errors}>
									{errors.age && touched.age && errors.age}
								</div>
								<input
									placeholder="City"
									type="text"
									name="city"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.city as string}
								/>
								<div className={styles.errors}>
									{errors.city && touched.city && errors.city}
								</div>
								<input
									placeholder="Education"
									type="text"
									name="education"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.education as string}
								/>
								<div className={styles.errors}>
									{errors.education && touched.education && errors.education}
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
