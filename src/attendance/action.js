import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";


export const clearTrigger = () => dispatch => dispatch({ type: 'CLEAR_TRIGGER_ATTENDANCE' })
export const resetAttendance = () => dispatch => dispatch({ type: 'RESET_ATTENDANCE' })
export const acceptEditReset = () => dispatch => dispatch({ type: 'CLEAN_ACCEPT_EDIT_ATTENDANCE' })

export const getAttendance = (project_key) => (dispatch, getState) => {
    const { token } = getState().auth

    let config = {
        headers: { "Authorization": token }
    }


    dispatch({ type: `GET_ATTENDANCE_PENDING` })

    return axios.get(baseURL + '/my-attendances-project/' + project_key, config)

        .then(response => {
            dispatch({
                type: `GET_ATTENDANCE_RESOLVED`,
                data: response.data,
                code: response.status
            });
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


export const clearAttendanceStaff = () => dispatch => dispatch({ type: 'CLEAR_ATTENDANCE_STAFF' })

export const getAttendanceStaff = (staff_project_key) => (dispatch, getState) => {
    const { token } = getState().auth

    let config = {
        headers: { "Authorization": token }
    }


    dispatch({ type: `GET_ATTENDANCE_STAFF_PENDING` })

    return axios.get(baseURL + '/attendance-staff/' + staff_project_key, config)

        .then(response => {
            dispatch({
                type: `GET_ATTENDANCE_STAFF_RESOLVED`,
                data: response.data,
                code: response.status
            });
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_ATTENDANCE_STAFF_REJECTED`,
                error
            });

            return { error }
        })
}


export const clearPersonAttendance = () => dispatch => dispatch({ type: 'CLEAR_PERSON_ATTENDANCE' })
export const getPersonAttendance = (project_key) => (dispatch, getState) => {
    const { token } = getState().auth

    let config = {
        headers: { "Authorization": token }
    }


    dispatch({ type: `GET_PRESON_ATTENDANCE_PENDING` })

    return axios.get(baseURL + '/my-attendances-project/' + project_key, config)

        .then(response => {
            dispatch({
                type: `GET_PERSON_ATTENDANCE_RESOLVED`,
                data: response.data,
                code: response.status
            });
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_PERSON_ATTENDANCE_REJECTED`,
                error
            });

            return { error }
        })
}





export const getAttendanceAbsence = (project_key) => (dispatch, getState) => {
    const { token } = getState().auth

    let config = {
        headers: { "Authorization": token }
    }

    dispatch({ type: `GET_ATTENDANCE_ABSENCE_PENDING` })

    return axios.get(baseURL + '/my-attendances-project/' + project_key + `?type=attendance`, config)
        .then(response => {
            dispatch({
                type: `GET_ATTENDANCE_ABSENCE_RESOLVED`,
                data: response.data,
                // code: response.status
            });
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_ATTENDANCE_ABSENCE_REJECTED`,
                error
            });

            return { error }
        })
}

export const getAttendanceTravel = (project_key) => (dispatch, getState) => {
    const { token } = getState().auth
    let config = { headers: { "Authorization": token } }

    dispatch({ type: `GET_ATTENDANCE_TRAVEL_PENDING` })

    return axios.get(baseURL + '/my-attendances-project/' + project_key + `?type=travel`, config)

        .then(response => {
            dispatch({
                type: `GET_ATTENDANCE_TRAVEL_RESOLVED`,
                data: response.data,
                // code: response.status
            });
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_ATTENDANCE_TRAVEL_REJECTED`,
                error
            });
            return { error }
        })
}


export const triggerAttendance = (form, project_key) => (dispatch, getState) => { //update
    const body = new FormData();
    for(const key of Object.keys(form)) {
        body.append(key, form[key]);
    }

    if(image) {
        body.append('Content-Type', `${form.image.type}`);
    }


    dispatch({ type: `TRIGGER_ATTENDANCE_PENDING` })

    return fetch(baseURL + '/add-my-attendances-project/' + project_key, {
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
            dispatch({
                type: `TRIGGER_ATTENDANCE_RESOLVED`,
                data: response,
            })
            return response
        })
        .catch(err => {
            dispatch({
                type: `TRIGGER_ATTENDANCE_REJECTED`,
                err
            })
        })
}

export const acceptAttendance = (staff_key) => (dispatch, getState) => { //STAFF KEY ?
    dispatch({ type: `ACCEPT_ATTENDANCE_PENDING` })

    return fetch(baseURL + '/staff-accept-attendances/' + staff_key, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization": getState().auth.token,
            // 'Content-Type': 'multipart/form-data'
        },
    })
        .then(res => {
            if(!res.ok) { throw new Error('Error ') }
            if(res.status >= 400) { throw Error('Error') }
            return res.json()
        })
        .then(response => {
            dispatch({
                type: `ACCEPT_ATTENDANCE_RESOLVED`,
                data: response.data,
                // code: response.status
            })
            return response
        })
        .catch(err => {
            dispatch({
                type: `ACCEPT_ATTENDANCE_REJECTED`,
                err
            })
        })
}

export const editAttendance = (form, attendance_key) => (dispatch, getState) => {

    const body = new FormData();

    for(const key of Object.keys(form)) {
        body.append(key, form[key]);
    }

    dispatch({ type: `EDIT_ATTENDANCE_PENDING` })


    return fetch(baseURL + '/edit-attendance-participant/' + attendance_key, {
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
            dispatch({
                type: `EDIT_ATTENDANCE_RESOLVED`,
                data: response,
            })
            return response
        })
        .catch(err => {
            dispatch({
                type: `EDIT_ATTENDANCE_REJECTED`,
                err
            })
        })
}