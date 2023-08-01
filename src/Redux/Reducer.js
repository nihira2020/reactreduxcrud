import { GET_ALL_RECORDS, GET_BY_CODE, OPEN_POPUP, REQ_ADD, REQ_DELETE, REQ_FAIL, REQ_START, REQ_UPDATE } from "./Actiontype"

export const initialstate = {
    isloading: false,
    companylist: [],
    companyobj: {},
    errormessage: ''
}

export const CompanyReducer = (state = initialstate, action) => {
    switch (action.type) {
        case REQ_START:
            return {
                ...state,
                isloading: true
            }
        case REQ_FAIL:
            return {
                ...state,
                isloading: false,
                errormessage: action.payload
            }
        case GET_ALL_RECORDS:
            return {
                ...state,
                isloading: false,
                companylist: action.payload
            }
        case GET_BY_CODE:
            return {
                ...state,
                companyobj: action.payload
            }
        case REQ_ADD:
            const _inputobj={...action.payload};
            _inputobj.id=Math.max(...state.companylist.map(o=>o.id))+1;
            return {
                ...state,
                companylist:[...state.companylist,_inputobj]
            }
        case REQ_UPDATE:
            const _inputdata={...action.payload};
            const _newdata=state.companylist.map(data=>{
              return _inputdata.id===data.id?_inputdata:data;
            });
            return {
                ...state,
                companylist:_newdata
            }
        case REQ_DELETE:
            const newdata=state.companylist.filter((data)=>{
                return data.id !==action.payload
             });
            return {
                ...state,
                companylist:newdata
            }
        case OPEN_POPUP:
            return {
                ...state,
                companyobj:{}
            }
        default: return state
    }

}