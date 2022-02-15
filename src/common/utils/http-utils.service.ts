import axios from 'axios';

export interface HttpHeaderOptions {
	jwt?: string;
	exceptLog?: boolean;
}
export type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export interface IResponse {
    code: number,
    message: string,
    responseTime: string,
    response: any
}

export const GET: IResponse(url: string, queryParams:object, responseType: 'json', options?: HttpHeaderOptions) {
    return await axios.get(url);
        if (response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log(error);
    }
    return null;
    }