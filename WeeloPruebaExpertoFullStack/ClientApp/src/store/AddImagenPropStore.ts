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
    images: ImageET[];
    idProperty: number;
    success:boolean;
}

export interface ImageET  {
    file:any,
    enable:boolean,
    fileurl:string,
    IdProperty:number
}

interface PropertyResponse {
    id: number;
}

interface RequestAddImagePropertyAction {
    type: typeof ADD_IMAGEN_PROPERTY;
    image: ImageET
}

interface RequestSaveImagesPropertyAction {
    type: typeof REQUEST_SAVE_IMAGE_PROPERTY;
    images: ImageET[]
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
    requestAddImage: (image:ImageET): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: ADD_IMAGEN_PROPERTY, image:image});         
    },
    requestSaveImages: (images:ImageET[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let idPrperty = getState().addImages.idProperty.toString();
        for (let index = 0; index < images.length; index++) {
            const image = images[index];
            if(image.file){
                const formData = new FormData();
                formData.append('PropertyId',idPrperty);
                formData.append('Image',image.file);                
                var myRequest = new Request('Api/Property/SaveImages', AuthRequestFormInfo(formData, 'POST'));
                executeReq<PropertyResponse>(myRequest)
                  .then(data => {
                      let success = false;
                      if(data.data!=undefined)
                          success = true;         
                    dispatch({ type: RECEIVE_SAVE_IMAGE_PROPERTY, success : success});                               
                });
                dispatch({ type: REQUEST_SAVE_IMAGE_PROPERTY , images: images});
            }            
        }
    },
    requestLoadImages: (idProperty:number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var myRequest = new Request('Api/Property/LoadImages/?propertyId='+idProperty, AuthRequestInfo());
        executeReq<ImageET[]>(myRequest)
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