import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";

/**
 * @payload : additional params/payload ( this API use it as params )
 * 
 */
export const getRequest = (url, action, withAuthorization = false, payload) => (dispatch, getState) => {

    // const baseURL = `${getState().auth.api_config}api/mobile/students/`

    // const token = withAuthorization ? { token: getState().auth.token } : {}

    // const params = { ...token, ...payload, }

    dispatch({ type: `${action}_PENDING` })

    return axios.get(baseURL + url,
        {
            "Authorization": getState().auth.token
        })

        .then(response => {
            dispatch({
                type: `${action}_RESOLVED`,
                data: response.data,
                code: response.status
            })
            // console.log(response)
            return response
        })
        .catch(error => {
            console.log(error, 'ERROR MAIN')

            dispatch({
                type: `${action}_REJECTED`,
                error
            })

            return { error }
        })
}


/**
 * 
 * @useFormData ?
 */
export const postRequest = (url, action, withAuthorization = false, params) => (dispatch, getState) => {

    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    // const baseURL = `${getState().auth.api_config}api/mobile/students/`

    const token = withAuthorization ? { token: getState().auth.token } : {}

    const payload = { ...token, ...params }

    const body = new FormData();

    for (const key of Object.keys(payload)) {
        body.append(key, payload[key]);
    }

    dispatch({ type: `${action}_PENDING` })

    return axios.post(baseURL + url, body)
        .then(response => {
            dispatch({
                type: `${action}_RESOLVED`,
                data: response.data,
                code: response.status
            })
            return response
        })
        .catch(error => {
            console.log(error, 'ERROR MAIN')
            dispatch({
                type: `${action}_REJECTED`,
                error
            })
            return { error }
        })
}
