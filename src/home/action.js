import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";




export const getSession = () => (dispatch, getState) => {
    /**
     * check net compare
     * check loggedin ?
     * load from async
     * 
     */

    let config = {
        headers: { "Authorization": getState().auth.token }
    }

    dispatch({ type: `GET_SESSION_PENDING` })
    console.log('FETCH GET SESSION')
    return axios.get(baseURL + '/session', config)

        .then(response => {
            dispatch({
                type: `GET_SESSION_RESOLVED`,
                data: response.data,
                code: response.status
            })
            // console.log(response)
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_SESSION_REJECTED`,
                error
            })

            return { error }
        })


    /**
     * save session
     * 
     */
}