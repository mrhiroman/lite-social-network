/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LikeModel } from './LikeModel';
import type { UserModel } from './UserModel';

export type PostModel = {
    id?: number;
    text?: string | null;
    imageUrl?: string | null;
    creationDate?: string;
    author?: UserModel;
    likes?: Array<LikeModel> | null;
};
