import internal from 'assert';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { AuthRequestInfo, executeReq } from '../common/Request';


const REQUEST_CREATE_PROPERTY = 'REQUEST_CREATE_PROPERTY';
const RECEIVE_CREATE_PROPERTY = 'RECEIVE_CREATE_PROPERTY';

const REQUEST_LOAD_OWNERS = 'REQUEST_LOAD_OWNERS';
const RECEIVE_LOAD_OWNERS = 'RECEIVE_LOAD_OWNERS';

const REQUEST_LOAD_LIST_PROPERTY = 'REQUEST_LOAD_LIST_PROPERTY';
const RECEIVE_LOAD_LIST_PROPERTY = 'RECEIVE_LOAD_LIST_PROPERTY';

export interface PropertyState {
    isLoading: boolean;
    startDateIndex: number;
    success?: boolean;
    notFound?: boolean;
    property?: PropertyET | undefined;
    owners?: OwnerET[]|undefined;
    listProperty : PropertyET[];
}

export interface PropertyET {
    name: string;
    address: string;
    price: number;
    codeInternal: string;
    year: number;
    idOwner: number;
    idProperty: number;
}

export interface OwnerET {
    idOwner: number;
    name: string;
    address: string;
    photo: string;
    birthday: Date;
}

interface PropertyResponse {
    id: number;
}

interface ReceiveCreatePropertyAction {
    type: typeof RECEIVE_CREATE_PROPERTY;
    success: boolean;
    notFound: boolean;
    property: PropertyET;
}

interface ReceiveListPropertyAction {
    type: typeof RECEIVE_LOAD_LIST_PROPERTY;
    listProperty: PropertyET[]|undefined;
    startDateIndex: number;
}

interface ReceiveListOwnerAction {
    type: typeof RECEIVE_LOAD_OWNERS;
    success: boolean;
    notFound: boolean;
    owners: OwnerET[]|undefined;
}

interface RequestListOwnerAction {
    type: typeof REQUEST_LOAD_OWNERS;
}

interface RequestCreatePropertyAction {
    type: typeof REQUEST_CREATE_PROPERTY;
}


interface RequestListPropertyAction {
    type: typeof REQUEST_LOAD_LIST_PROPERTY;
    startDateIndex: number;
}

type KnownAction = RequestCreatePropertyAction | ReceiveCreatePropertyAction | 
ReceiveListOwnerAction | RequestListOwnerAction | ReceiveListPropertyAction | RequestListPropertyAction;

export const actionCreators = {
    requestCreateProperty: (property:PropertyET): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var myRequest = new Request('Api/Property/CreateProperty', AuthRequestInfo(property,'POST'));
        executeReq<PropertyResponse>(myRequest)
            .then(data => {
                let success = false;
                if(data.data!=undefined && data.data.id>0){
                    success = true;
                    property.idProperty = data.data.id;
                }
                dispatch({ type: RECEIVE_CREATE_PROPERTY, property: property, success : success, notFound:!success});                                  
            });
        dispatch({ type: REQUEST_CREATE_PROPERTY});
    },
    requestLoadOwners: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var myRequest = new Request('Api/Owner', AuthRequestInfo());
        executeReq<OwnerET[]>(myRequest)
            .then(data => {
                let success = false;
                if(data.data!=undefined && data.data.length){
                    success = true;
                }
                dispatch({ type: RECEIVE_LOAD_OWNERS, owners: data.data, success : success, notFound:!success});                                  
            });
        dispatch({ type: REQUEST_LOAD_OWNERS});
    },
    
    requestLoadListProperty: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var myRequest = new Request('Api/Property/'+startDateIndex, AuthRequestInfo());
        executeReq<PropertyET[]>(myRequest)
            .then(data => {
                let success = false;
                if(data.data!=undefined && data.data.length){
                    success = true;
                }
                dispatch({ type: RECEIVE_LOAD_LIST_PROPERTY, listProperty: data.data,startDateIndex:startDateIndex});                                  
            });
        dispatch({ type: REQUEST_LOAD_LIST_PROPERTY, startDateIndex:startDateIndex});
    }
};



const unloadedState: PropertyState = { 
                        property: undefined, 
                        isLoading: false, 
                        notFound:false, 
                        owners:undefined,
                        listProperty: [],
                        startDateIndex:0 };

export const reducer: Reducer<PropertyState> = (state: PropertyState | undefined, incomingAction: Action): PropertyState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case REQUEST_CREATE_PROPERTY:
            return {
                ...state,
                isLoading: true,
                notFound:false
            };
        case RECEIVE_CREATE_PROPERTY:
            return {
                ...state,
                success: action.success,
                property: action.property,
                isLoading: false,
                notFound: action.notFound,                
                listProperty:[...state.listProperty, action.property]
            };
        case RECEIVE_LOAD_OWNERS:
            return {
                ...state,
                success: action.success,
                isLoading: false,
                notFound: action.notFound,
                owners: action.owners
            };
            break;
        case REQUEST_LOAD_LIST_PROPERTY:
            return {
                ...state,
                startDateIndex: action.startDateIndex,
            };
        case RECEIVE_LOAD_LIST_PROPERTY:
            if (action.startDateIndex === state.startDateIndex) {
            return {
                ...state,
                listProperty: action.listProperty ? action.listProperty : [],
                isLoading: false
            };
        }

    }

    return state;
};