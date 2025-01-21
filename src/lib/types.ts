import { AxiosResponse } from "axios";

export type API_RESPONSE_TYPE = [AxiosResponse, null] | [null, Error];
