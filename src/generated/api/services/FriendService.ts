/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserModel } from '../models/UserModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FriendService {

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static getApiFriends(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/friends/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static getApiFriendsRemove(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/friends/remove/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns UserModel Success
     * @throws ApiError
     */
    public static getApiFriends1(): CancelablePromise<Array<UserModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/friends',
        });
    }

}
