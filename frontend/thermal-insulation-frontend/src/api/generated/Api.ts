/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApplicationsCompleteUpdateParams {
  /** Application ID */
  id: number;
}

export interface Lab1InternalAppDsApplicationMaterial {
  area?: number;
  created_at?: string;
  material?: Lab1InternalAppDsMaterial;
  material_id?: number;
}

export interface Lab1InternalAppDsMaterial {
  price_per_m2?: number;
  created_at?: string;
  description?: string;
  id?: number;
  image_url?: string;
  lambda?: number;
  name?: string;
  status?: string;
  thickness?: number;
}

export interface Lab1InternalAppDsMaterialsApplication {
  completed_at?: string;
  created_at?: string;
  creator?: Lab1InternalAppDsUser;
  creator_id?: number;
  id?: number;
  indoor_temp?: number;
  materials?: Lab1InternalAppDsApplicationMaterial[];
  moderator?: Lab1InternalAppDsUser;
  moderator_id?: number;
  outdoor_temp?: number;
  status?: string;
  submitted_at?: string;
  total_area?: number;
  total_savings?: number;
}

export interface Lab1InternalAppDsUser {
  created_at?: string;
  id?: number;
  is_moderator?: boolean;
  login?: string;
}

export interface MatApplicsListParams {
  /** End date (YYYY-MM-DD) */
  end_date?: string;
  /** Start date (YYYY-MM-DD) */
  start_date?: string;
  /** Status filter */
  status?: string;
}

export interface MatApplicsRejectUpdateParams {
  /** Application ID */
  id: number;
}

export interface MaterialsAddToDraftCreateParams {
  /** Material ID */
  id: number;
}

/** Area data */
export type MaterialsAddToDraftCreatePayload = object;

export interface MaterialsDetailParams {
  /** Material ID */
  id: number;
}

export interface MaterialsListParams {
  /** Search filter */
  filter?: string;
}

/** Login credentials */
export type UsersLoginCreatePayload = object;

/** Profile update data */
export type UsersMeUpdatePayload = object;

/** User registration data */
export type UsersRegisterCreatePayload = object;

export namespace Api {
  /**
   * @description Complete application (moderator only)
   * @tags Applications
   * @name ApplicationsCompleteUpdate
   * @summary Complete application
   * @request PUT:/api/applications/{id}/complete
   * @secure
   * @response `200` `object` Application completed
   * @response `400` `object` Bad request
   * @response `403` `object` Forbidden
   * @response `404` `object` Not found
   */
  export namespace ApplicationsCompleteUpdate {
    export type RequestParams = {
      /** Application ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * @description Get current user's draft application info
   * @tags Applications
   * @name MatApplicsCartList
   * @summary Get cart info
   * @request GET:/api/mat_applics/cart
   * @response `200` `object` Cart information
   */
  export namespace MatApplicsCartList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * @description Get applications with filtering. For moderators - all applications, for users - only their applications
   * @tags Applications
   * @name MatApplicsList
   * @summary Get applications list
   * @request GET:/api/mat_applics
   * @secure
   * @response `200` `(Lab1InternalAppDsMaterialsApplication)[]` OK
   * @response `401` `object` Unauthorized
   * @response `500` `object` Internal server error
   */
  export namespace MatApplicsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** End date (YYYY-MM-DD) */
      end_date?: string;
      /** Start date (YYYY-MM-DD) */
      start_date?: string;
      /** Status filter */
      status?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Lab1InternalAppDsMaterialsApplication[];
  }

  /**
   * @description Reject application (moderator only)
   * @tags Applications
   * @name MatApplicsRejectUpdate
   * @summary Reject application
   * @request PUT:/api/mat_applics/{id}/reject
   * @secure
   * @response `200` `object` Application rejected
   * @response `400` `object` Bad request
   * @response `403` `object` Forbidden
   * @response `404` `object` Not found
   */
  export namespace MatApplicsRejectUpdate {
    export type RequestParams = {
      /** Application ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * @description Add material to user's draft application
   * @tags Materials
   * @name MaterialsAddToDraftCreate
   * @summary Add material to draft
   * @request POST:/api/materials/{id}/add-to-draft
   * @secure
   * @response `200` `object` Material added
   */
  export namespace MaterialsAddToDraftCreate {
    export type RequestParams = {
      /** Material ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = MaterialsAddToDraftCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * @description Get material details by ID
   * @tags Materials
   * @name MaterialsDetail
   * @summary Get material by ID
   * @request GET:/api/materials/{id}
   * @response `200` `Lab1InternalAppDsMaterial` OK
   * @response `404` `object` Material not found
   */
  export namespace MaterialsDetail {
    export type RequestParams = {
      /** Material ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Lab1InternalAppDsMaterial;
  }

  /**
   * @description Get list of insulation materials
   * @tags Materials
   * @name MaterialsList
   * @summary Get materials list
   * @request GET:/api/materials
   * @response `200` `(Lab1InternalAppDsMaterial)[]` OK
   */
  export namespace MaterialsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Search filter */
      filter?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Lab1InternalAppDsMaterial[];
  }

  /**
   * @description Authenticate user and return JWT token
   * @tags Users
   * @name UsersLoginCreate
   * @summary Login user
   * @request POST:/api/users/login
   * @response `200` `object` Login successful
   * @response `401` `object` Unauthorized
   */
  export namespace UsersLoginCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersLoginCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * @description Logout user and invalidate token
   * @tags Users
   * @name UsersLogoutCreate
   * @summary User logout
   * @request POST:/api/users/logout
   * @secure
   * @response `200` `object` Logout successful
   */
  export namespace UsersLogoutCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * @description Get current user profile information
   * @tags Users
   * @name UsersMeList
   * @summary Get current user
   * @request GET:/api/users/me
   * @secure
   * @response `200` `object` User profile
   */
  export namespace UsersMeList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * @description Update current user profile information
   * @tags Users
   * @name UsersMeUpdate
   * @summary Update current user
   * @request PUT:/api/users/me
   * @secure
   * @response `200` `object` Profile updated
   */
  export namespace UsersMeUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersMeUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * @description Register a new user
   * @tags Users
   * @name UsersRegisterCreate
   * @summary Register new user
   * @request POST:/api/users/register
   * @response `201` `object` User created
   * @response `400` `object` Bad request
   */
  export namespace UsersRegisterCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersRegisterCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Materials App API
 * @version 1.0
 * @license MIT (https://opensource.org/licenses/MIT)
 * @termsOfService http://swagger.io/terms/
 * @baseUrl http://localhost:8080
 * @externalDocs https://swagger.io/resources/open-api/
 * @contact API Support <support@materials-app.com> (http://localhost:8080)
 *
 * API for heat insulation materials and applications
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * @description Complete application (moderator only)
     *
     * @tags Applications
     * @name ApplicationsCompleteUpdate
     * @summary Complete application
     * @request PUT:/api/applications/{id}/complete
     * @secure
     * @response `200` `object` Application completed
     * @response `400` `object` Bad request
     * @response `403` `object` Forbidden
     * @response `404` `object` Not found
     */
    applicationsCompleteUpdate: (
      { id, ...query }: ApplicationsCompleteUpdateParams,
      params: RequestParams = {},
    ) =>
      this.http.request<object, object>({
        path: `/api/mat_applics/${id}/complete`,
        method: "PUT",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get current user's draft application info
     *
     * @tags Applications
     * @name MatApplicsCartList
     * @summary Get cart info
     * @request GET:/api/mat_applics/cart
     * @response `200` `object` Cart information
     */
    matApplicsCartList: (params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/mat_applics/cart`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get applications with filtering. For moderators - all applications, for users - only their applications
     *
     * @tags Applications
     * @name MatApplicsList
     * @summary Get applications list
     * @request GET:/api/mat_applics
     * @secure
     * @response `200` `(Lab1InternalAppDsMaterialsApplication)[]` OK
     * @response `401` `object` Unauthorized
     * @response `500` `object` Internal server error
     */
    matApplicsList: (query: MatApplicsListParams, params: RequestParams = {}) =>
      this.http.request<Lab1InternalAppDsMaterialsApplication[], object>({
        path: `/api/mat_applics`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Reject application (moderator only)
     *
     * @tags Applications
     * @name MatApplicsRejectUpdate
     * @summary Reject application
     * @request PUT:/api/mat_applics/{id}/reject
     * @secure
     * @response `200` `object` Application rejected
     * @response `400` `object` Bad request
     * @response `403` `object` Forbidden
     * @response `404` `object` Not found
     */
    matApplicsRejectUpdate: (
      { id, ...query }: MatApplicsRejectUpdateParams,
      params: RequestParams = {},
    ) =>
      this.http.request<object, object>({
        path: `/api/mat_applics/${id}/reject`,
        method: "PUT",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Add material to user's draft application
     *
     * @tags Materials
     * @name MaterialsAddToDraftCreate
     * @summary Add material to draft
     * @request POST:/api/materials/{id}/add-to-draft
     * @secure
     * @response `200` `object` Material added
     */
    materialsAddToDraftCreate: (
      { id, ...query }: MaterialsAddToDraftCreateParams,
      input: MaterialsAddToDraftCreatePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<object, any>({
        path: `/api/materials/${id}/add-to-draft`,
        method: "POST",
        body: input,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get material details by ID
     *
     * @tags Materials
     * @name MaterialsDetail
     * @summary Get material by ID
     * @request GET:/api/materials/{id}
     * @response `200` `Lab1InternalAppDsMaterial` OK
     * @response `404` `object` Material not found
     */
    materialsDetail: (
      { id, ...query }: MaterialsDetailParams,
      params: RequestParams = {},
    ) =>
      this.http.request<Lab1InternalAppDsMaterial, object>({
        path: `/api/materials/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of insulation materials
     *
     * @tags Materials
     * @name MaterialsList
     * @summary Get materials list
     * @request GET:/api/materials
     * @response `200` `(Lab1InternalAppDsMaterial)[]` OK
     */
    materialsList: (query: MaterialsListParams, params: RequestParams = {}) =>
      this.http.request<Lab1InternalAppDsMaterial[], any>({
        path: `/api/materials`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Authenticate user and return JWT token
     *
     * @tags Users
     * @name UsersLoginCreate
     * @summary Login user
     * @request POST:/api/users/login
     * @response `200` `object` Login successful
     * @response `401` `object` Unauthorized
     */
    usersLoginCreate: (
      input: UsersLoginCreatePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<object, object>({
        path: `/api/users/login`,
        method: "POST",
        body: input,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Logout user and invalidate token
     *
     * @tags Users
     * @name UsersLogoutCreate
     * @summary User logout
     * @request POST:/api/users/logout
     * @secure
     * @response `200` `object` Logout successful
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/users/logout`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get current user profile information
     *
     * @tags Users
     * @name UsersMeList
     * @summary Get current user
     * @request GET:/api/users/me
     * @secure
     * @response `200` `object` User profile
     */
    usersMeList: (params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update current user profile information
     *
     * @tags Users
     * @name UsersMeUpdate
     * @summary Update current user
     * @request PUT:/api/users/me
     * @secure
     * @response `200` `object` Profile updated
     */
    usersMeUpdate: (input: UsersMeUpdatePayload, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/users/me`,
        method: "PUT",
        body: input,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Register a new user
     *
     * @tags Users
     * @name UsersRegisterCreate
     * @summary Register new user
     * @request POST:/api/users/register
     * @response `201` `object` User created
     * @response `400` `object` Bad request
     */
    usersRegisterCreate: (
      input: UsersRegisterCreatePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<object, object>({
        path: `/api/users/register`,
        method: "POST",
        body: input,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}

export default Api;