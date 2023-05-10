/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserModel = {
    id?: number;
    name?: string | null;
    avatarUrl?: string | null;
    age?: number;
    city?: string | null;
    education?: string | null;
    friends?: Array<UserModel> | null;
};
