/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LikeService {

    /**
     * @param postId 
     * @returns any Success
     * @throws ApiError
     */
    public static getApiLikes(
postId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/likes/{postId}',
            path: {
                'postId': postId,
            },
        });
    }

    /**
     * @param postId 
     * @returns any Success
     * @throws ApiError
     */
    public static getApiLikesRemove(
postId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/likes/remove/{postId}',
            path: {
                'postId': postId,
            },
        });
    }

}
