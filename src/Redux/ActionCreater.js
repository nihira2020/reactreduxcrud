import axios from "axios";
import { GetAllRecords, GetdatabyCode, ReqAddRequest, ReqDeleteRequest, ReqUpdateRequest, RequestEnd, RequestFail, RequestStart } from "./Action"
import { toast } from "react-toastify";

export const FetchCompanyList = () => {
    return (dispatch) => {
        dispatch(RequestStart());
        setTimeout(()=>{
        axios.get('http://localhost:8000/comapany').then(res => {
            const _list = res.data;
            dispatch(GetAllRecords(_list));
        }).catch(err => {
            dispatch(RequestFail(err.message))
        })
    },1000)
    }
}

export const FunctionAddCompany=(data)=>{
    return (dispatch)=>{
        axios.post('http://localhost:8000/comapany',data).then(res=>{
            dispatch(ReqAddRequest(data));
           toast.success('Company created successfully.')
          }).catch(err=>{
            toast.error('Failed to create company.')
          })
     
    }
}

export const RemoveCompany=(code)=>{
    return (dispatch)=>{
      //setTimeout(() => {
        axios.delete('http://localhost:8000/comapany/'+code).then(res=>{
            toast.success('Company removed successfully.')
            dispatch(ReqDeleteRequest(code));
          }).catch(err=>{
            toast.error('Failed to remove company.')
          })
    }
}

export const FunctionUpdateCompany=(data,code)=>{
    return (dispatch)=>{
      //setTimeout(() => {
        axios.put('http://localhost:8000/comapany/'+code,data).then(res=>{
            dispatch(ReqUpdateRequest(data));
            toast.success('Company Updated successfully.')
          }).catch(err=>{
            toast.error('Failed to update company.')
          })
     // }, 2000);
     
    }
}
export const FetchUserObj=(code)=>{
    return (dispatch)=>{
      //setTimeout(() => {
        axios.get('http://localhost:8000/comapany/'+code).then(res=>{
            const _obj=res.data;
            dispatch(GetdatabyCode(_obj));
          }).catch(err=>{
            toast.error('Failed to fetch data.')
          })
     // }, 2000);
     
    }
}