import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";


export const setAccessToken = (token) => dispatch => dispatch({ 'type': 'SAVE_ACCESS_TOKEN', token })
export const setKoor = (bool) => dispatch => dispatch({ 'type': 'SET_KOOR_AUTH', bool })

export const resetAuth = () => dispatch => dispatch({ type: 'RESET_AUTH' })


export const loginAction = (form) => (dispatch) => {
    const body = new FormData();
    for(const key of Object.keys(form)) {
        body.append(key, form[key]);
    }

    dispatch({ type: `SIGN_IN_PENDING` })

    return fetch(baseURL + '/login', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data'
        },
        body
    })
        .then(res => {
            if(!res.ok) { throw new Error('Error ') }
            if(res.status >= 400) { throw Error('Error') }
            return res.json()
        })
        .then(response => {
            dispatch({
                type: `SIGN_IN_RESOLVED`,
                data: response,
            })
            return response
        })
        .catch(err => {
            dispatch({
                type: `SIGN_IN_REJECTED`,
                err
            })
        })
}

