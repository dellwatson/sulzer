import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";


export const clearTrigger = () => dispatch => dispatch({ 'type': 'CLEAR_TRIGGER_TRAVEL' })

export const getTravel = () => (dispatch, getState) => {

    // console.log(getState().home.DATA)

    let config = {
        headers: { "Authorization": getState().auth.token }
    }

    dispatch({ type: `GET_TRAVEL_PENDING` })

    return axios.get(baseURL + '/my-attendances-project/' + getState().home.DATA.active_project.key + `?type=travel`, config)

        .then(response => {
            dispatch({
                type: `GET_TRAVEL_RESOLVED`,
                data: response.data,
                code: response.status
            })
            // console.log(response)
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_TRAVEL_REJECTED`,
                error
            })

            return { error }
        })
}


export const triggerTravel = (form) => (dispatch, getState) => {
    console.log('fetching')

    const body = new FormData();

    for(const key of Object.keys(form)) {
        body.append(key, form[key]);
    }

    dispatch({ type: `TRIGGER_TRAVEL_PENDING` })

    return fetch(baseURL + '/add-my-attendances-project/' + getState().home.DATA.active_project.key, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": getState().auth.token,
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
            console.log(response)

            dispatch({
                type: `TRIGGER_TRAVEL_RESOLVED`,
                data: response.data,
                // code: response.status
            })
            return response
        })
        .catch(err => {
            dispatch({
                type: `TRIGGER_TRAVEL_REJECTED`,
                err
            })
        })
}