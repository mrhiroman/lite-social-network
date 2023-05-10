/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginUserModel } from '../models/LoginUserModel';
import type { RegisterUserModel } from '../models/RegisterUserModel';
import type { UserInfoModel } from '../models/UserInfoModel';
import type { UserModel } from '../models/UserModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUsersLogin(
requestBody?: LoginUserModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUsersRegister(
requestBody?: RegisterUserModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns UserModel Success
     * @throws ApiError
     */
    public static getApiUsersMe(): CancelablePromise<UserModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me',
        });
    }

    /**
     * @param id 
     * @returns UserModel Success
     * @throws ApiError
     */
    public static getApiUsers(
id: number,
): CancelablePromise<UserModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUsersUpdate(
requestBody?: UserInfoModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUsersUploadAvatar(
requestBody?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/upload_avatar',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
