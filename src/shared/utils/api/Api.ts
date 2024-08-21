import {HttpClient, RequestParams} from "./http-client";
import {GetUser} from "@/shared";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    userControllerGetUser = (search: string, params: RequestParams = {}) =>
        this.request<GetUser, void>({
            path: `/users?${search}`,
            method: "GET",
            format: "json",
            ...params,
        });


    userControllerGetUserById = (search: string, params: RequestParams = {}) =>
        this.request<GetUser[], void>({
            path: `/users?id=${search}`,
            method: "GET",
            format: "json",
            ...params,
        });

}
