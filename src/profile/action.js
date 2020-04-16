import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";


export const setLoading = bool => dispatch => dispatch({ type: `SET_LOADING`, bool })
export const setLoadOffline = bool => dispatch => dispatch({ type: `SET_LOAD_OFFLINE`, bool })
export const setCount = count => dispatch => dispatch({ type: `SET_COUNT`, count })


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


export const getAttendanceInfo = (project_key) => (dispatch, getState) => {
    const { token } = getState().auth

    let config = {
        headers: { "Authorization": token }
    }

    // dispatch({ type: `GET_ATTENDANCE_PENDING` })

    return axios.get(baseURL + '/my-attendances-project/' + project_key, config)

        .then(response => {
            // dispatch({
            //     type: `GET_ATTENDANCE_RESOLVED`,
            //     data: response.data,
            //     code: response.status
            // });
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_ATTENDANCE_REJECTED`,
                error
            });

            return { error }
        })
}