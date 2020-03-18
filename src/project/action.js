import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";




export const getProjects = () => (dispatch, getState) => {


    let config = {
        headers: { "Authorization": getState().auth.token }
    }

    dispatch({ type: `GET_PROJECTS_PENDING` })
    return axios.get(baseURL + '/projects', config)
        .then(response => {
            dispatch({
                type: `GET_PROJECTS_RESOLVED`,
                data: response.data,
                // code: response.status
            })
            // console.log(response)
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_PROJECTS_REJECTED`,
                error
            })

            return { error }
        })


    // return fetch(baseURL + '/projects', {
    //     method: 'GET',
    //     headers: {
    //         "Accept": "application/json",
    //         "Authorization": getState().auth.token,
    //     },
    // })
    //     .then(res => {
    //         // console.log(res)
    //         if(!res.ok) { throw new Error('Error ') }
    //         if(res.status >= 400) { throw Error('Error') }
    //         return res.json()
    //     })
    //     .then(response => {
    //         console.log('succse')
    //         console.log(response)
    //         dispatch({
    //             type: `GET_PROJECTS_RESOLVED`,
    //             data: response.data,
    //             // code: response.status
    //         })
    //         return response
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         dispatch({
    //             type: `GET_PROJECTS_REJECTED`,
    //             err
    //         })
    //     })

}