/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddPostModel } from '../models/AddPostModel';
import type { PostModel } from '../models/PostModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostService {

    /**
     * @param userId 
     * @returns PostModel Success
     * @throws ApiError
     */
    public static getApiPosts(
userId: number,
): CancelablePromise<Array<PostModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

    /**
     * @returns PostModel Success
     * @throws ApiError
     */
    public static getApiPostsNews(): CancelablePromise<Array<PostModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/news',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiPosts(
requestBody?: AddPostModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
