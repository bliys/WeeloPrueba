import { ResponseBase } from "./Response";

export const SimpleRequestInfo = (data:any,method:string)=>{
    var headers = new Headers();
    headers.append('Accept', 'application/json, text/plain');
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const requestInfo: RequestInit = { 
        method: method,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body : JSON.stringify(data)
        };
    return requestInfo;
}

export const AuthRequestInfo = (data?:any,method:string='GET')=>{
    var headers = new Headers();
    headers.append('Accept', 'application/json, text/plain');
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    
    const requestInfo: RequestInit = { 
        method: method,
        headers: headers,
        mode: 'cors',
        cache: 'default'
        };
        if(data)
            requestInfo.body = JSON.stringify(data);
            
    return requestInfo;
}

export async function executeReq<T>(req:Request){
    const response = await fetch(req);
    if(response.status == 401){
        const res:ResponseBase<T> = {
            data: undefined
        };
        localStorage.setItem('token','');
        window.location.replace('/');
        return res;
    }
        
    return await (response.json() as Promise<ResponseBase<T>>);                
}