import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";

export const cleanStaffInfo = () => dispatch => dispatch({ type: `CLEAR_STAFF_INFO` })

export const refresh = () => (dispatch, getState) => {
    /**
     * refresh data attendance
     */
    // let config = {
    //     headers: { "Authorization": getState().auth.token }
    // }

    // axios.get('http://api-sulzerabsensi.sobatteknologi.com/api/truncate-attendances', config)
}


export const getStaffInfo = (project_key = 1) => (dispatch, getState) => {
    /**
     * check net compare
     * check loggedin ?
     * load from async
     * 
     */

    let config = {
        headers: { "Authorization": getState().auth.token }
    }

    dispatch({ type: `GET_STAFF_PENDING` })

    return axios.get(baseURL + `/all-my-staff-in-project/${project_key}`, config)

        .then(response => {
            dispatch({
                type: `GET_STAFF_RESOLVED`,
                data: response.data,
                code: response.status
            })
            // console.log(response)
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_STAFF_REJECTED`,
                error
            })

            return { error }
        })

    /**
     * save session
     * 
     */
}



export const updateAccept = (key) => (dispatch, getState) => {
    console.log(key)
    let config = {
        headers: { "Authorization": getState().auth.token }
    }

    dispatch({ type: `UPDATE_ACCEPT_PENDING` })

    return axios.put(baseURL + '/staff-accept-attendances/' + `${key}`, config)

        .then(response => {
            dispatch({
                type: `UPDATE_ACCEPT_RESOLVED`,
                data: response.data,
                code: response.status
            })
            console.log(response)
            return response
        })
        .catch(error => {
            console.log(error)

            dispatch({
                type: `UPDATE_ACCEPT_REJECTED`,
                error
            })

            return { error }
        })
}

