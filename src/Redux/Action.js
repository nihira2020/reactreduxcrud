import { GET_ALL_RECORDS, GET_BY_CODE, OPEN_POPUP, REQ_ADD, REQ_DELETE, REQ_FAIL, REQ_START, REQ_UPDATE } from "./Actiontype"

export const RequestStart = () => {
    return {
        type: REQ_START
    }
}

export const Openpopup = () => {
    return {
        type: OPEN_POPUP
    }
}


export const RequestFail = (err) => {
    return {
        type: REQ_FAIL,
        payload:err
    }
}

export const GetAllRecords = (data) => {
    return {
        type: GET_ALL_RECORDS,
        payload:data
    }
}

export const GetdatabyCode = (data) => {
    return {
        type: GET_BY_CODE,
        payload:data
    }
}

export const ReqAddRequest = (data) => {
    return {
        type: REQ_ADD,
        payload:data
    }
}

export const ReqUpdateRequest = (data) => {
    return {
        type: REQ_UPDATE,
        payload:data
    }
}

export const ReqDeleteRequest = (code) => {
    return {
        type: REQ_DELETE,
        payload:code
    }
}