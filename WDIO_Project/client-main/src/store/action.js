import { CURRENT_PAGE } from './actionTypes';
import { APIKIT } from '../helper/apis';
import { URLS } from '../utlities/Url';
export const currentPage = (page) => {
    return async (dispatch) => {
        dispatch({ type: CURRENT_PAGE, payload: page })
    }
}



// export const getUserList = () => {
//     return async (dispatch) => {
//         const resp = await APIKIT.get(URLS.getUsers);
//         dispatch({ type: GET_USERS_LIST, payload: resp?.data || [] })

//     }
// }