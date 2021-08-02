import internal from 'assert';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { AuthRequestFormInfo, AuthRequestInfo, executeReq } from '../common/Request';


const ADD_IMAGEN_PROPERTY = 'ADD_IMAGEN_PROPERTY';
const REQUEST_SAVE_IMAGE_PROPERTY = 'REQUEST_SAVE_IMAGE_PROPERTY';
const RECEIVE_SAVE_IMAGE_PROPERTY = 'RECEIVE_SAVE_IMAGE_PROPERTY';
const REQUEST_LOAD_LIST_IMAGE_PROPERTY = 'REQUEST_LOAD_LIST_IMAGE_PROPERTY';
const RECEIVE_LOAD_LIST_IMAGE_PROPERTY = 'RECEIVE_LOAD_LIST_IMAGE_PROPERTY';


export interface AddImagenPropertyState {
    isLoading: boolean;
    images: any[];
    idProperty: number;
    success:boolean;
}

interface RequestAddImagePropertyAction {
    type: typeof ADD_IMAGEN_PROPERTY;
    image: any
}

interface RequestSaveImagesPropertyAction {
    type: typeof REQUEST_SAVE_IMAGE_PROPERTY;
    images: any[]
}

interface ReceiveSaveImagesPropertyAction {
    type: typeof RECEIVE_SAVE_IMAGE_PROPERTY;
    success:boolean;
}

interface RequestLoadImagesPropertyAction {
    type: typeof REQUEST_LOAD_LIST_IMAGE_PROPERTY;
    idProperty: number;
}

interface ReceiveLoadImagesPropertyAction {
    type: typeof RECEIVE_LOAD_LIST_IMAGE_PROPERTY;
    success:boolean;
    images:any[]|undefined;
}

type KnownAction = ReceiveSaveImagesPropertyAction | 
                    RequestSaveImagesPropertyAction | 
                    RequestAddImagePropertyAction |
                    RequestLoadImagesPropertyAction |
                    ReceiveLoadImagesPropertyAction;

export const actionCreators = {
    requestAddImage: (image:any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: ADD_IMAGEN_PROPERTY, image:image});         
    },
    requestSaveImages: (images:any[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let idPrperty = getState().addImages.idProperty.toString();
        for (let index = 0; index < images.length; index++) {
            const file = images[index];
            const formData = new FormData();
            formData.append('PropertyId',idPrperty);
            formData.append('Image',file);                
            var myRequest = new Request('Api/Property/SaveImages', AuthRequestFormInfo(formData, 'POST'));
            executeReq<number[]>(myRequest)
              .then(data => {
                  let success = false;
                  if(data.data!=undefined && data.data.length)
                      success = true;         
                dispatch({ type: RECEIVE_SAVE_IMAGE_PROPERTY, success : success});                               
            });
            dispatch({ type: REQUEST_SAVE_IMAGE_PROPERTY , images: images});
        }
    },
    requestLoadImages: (idProperty:number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var myRequest = new Request('Api/Property/LoadImages/'+idProperty, AuthRequestInfo());
        executeReq<any[]>(myRequest)
            .then(data => {
                let success = false;
                if(data.data!=undefined && data.data.length){
                    success = true;
                }
                dispatch({ type: RECEIVE_LOAD_LIST_IMAGE_PROPERTY, images: data.data, success : success});                                  
            });
        dispatch({ type: REQUEST_LOAD_LIST_IMAGE_PROPERTY, idProperty: idProperty});
    }
};

const unloadedState: AddImagenPropertyState = {
                        isLoading: false,
                        images: [],
                        idProperty: 0,
                        success:false
                    };

export const reducer: Reducer<AddImagenPropertyState> = (state: AddImagenPropertyState | undefined, incomingAction: Action): AddImagenPropertyState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case RECEIVE_SAVE_IMAGE_PROPERTY:
            return {
                ...state,
                isLoading: false
            };
        case ADD_IMAGEN_PROPERTY:
            debugger
            return {
                ...state,
                images: state.images.concat(action.image)
            };
        case REQUEST_SAVE_IMAGE_PROPERTY:
            return {
                ...state,
                images: action.images,
                isLoading: true
            };
            break;
        case REQUEST_LOAD_LIST_IMAGE_PROPERTY:
            return {
                ...state,
                idProperty: action.idProperty,
                isLoading: true
            };
            break;
        case RECEIVE_LOAD_LIST_IMAGE_PROPERTY:
            return {
                ...state,
                images: (action.images)?action.images:[],
                isLoading: false
            };
            break;
    }

    return state;
};