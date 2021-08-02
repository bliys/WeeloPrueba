import internal from 'assert';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { executeReq, SimpleRequestInfo } from '../common/Request';


const REQUEST_LOGIN = 'REQUEST_LOGIN';
const RECEIVE_LOGIN = 'RECEIVE_LOGIN';

export interface LoginState {
    isLoading: boolean;
    success?: boolean;
    notFound: boolean;
    user: LoginResponse | undefined;
}

export interface LoginResponse {
    token: string;
    idUser: number;
}

export interface LoginRequest {
    user:string;
    password:string;
}

interface RequestLoginAction {
    type: typeof REQUEST_LOGIN;
}

interface ReceiveLoginAction {
    type: typeof RECEIVE_LOGIN;
    success: boolean;
    notFound: boolean;
    user: LoginResponse|undefined;
}


type KnownAction = RequestLoginAction | ReceiveLoginAction;


export const actionCreators = {
    requestLogin: (user:string , password:string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.login && user !== null && password != null) {
            var myRequest = new Request('Api/Login', SimpleRequestInfo({user, password},'POST'));
            executeReq<LoginResponse>(myRequest)
                .then(data => {
                    let success = (data.data!=undefined && data.data.token.length>0);
                    dispatch({ type: RECEIVE_LOGIN, user: data.data, success : success, notFound:!success});
                    if(data.data != undefined){
                        localStorage.setItem('token',data.data.token);
                        window.location.replace('/');
                    }                    
                });

            dispatch({ type: REQUEST_LOGIN});
        }
    }
};



const unloadedState: LoginState = { user: undefined, isLoading: false, notFound:false };

export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                user: state.user,
                isLoading: true,
                notFound:false,
            };
        case RECEIVE_LOGIN:
            return {
                success: action.success,
                user: action.user,
                isLoading: false,
                notFound: action.notFound
            };
            break;
    }

    return state;
};