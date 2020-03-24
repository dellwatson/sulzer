import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";


export const setAccessToken = (token) => dispatch => dispatch({ 'type': 'SAVE_ACCESS_TOKEN', token })
export const setKoor = (bool) => dispatch => dispatch({ 'type': 'SET_KOOR_AUTH', bool })

export const resetAuth = () => dispatch => dispatch({ type: 'RESET_AUTH' })


export const loginAction = (body) => (dispatch) => {
    dispatch({ type: `SIGN_IN_PENDING` })


    // return axios.post(baseURL + '/login', body)
    //     .then(response => {
    //         dispatch({
    //             type: `SIGN_IN_RESOLVED`,
    //             data: response,
    //             // code: response.status
    //         })
    //         console.log(response)
    //         return response
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         dispatch({
    //             type: `SIGN_IN_REJECTED`,
    //             error
    //         })

    //         return { error }
    //     })

    return fetch(baseURL + '/login', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data'
        },
        body
    })
        .then(res => {
            console.log(res)
            if(!res.ok) { throw new Error('Error ') }
            if(res.status >= 400) { throw Error('Error') }

            return res.json()
        })
        .then(json => {
            dispatch({
                type: `SIGN_IN_RESOLVED`,
                data: json,
                // code: response.status
            })
            return json
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: `SIGN_IN_REJECTED`,
                err
            })
        })

}