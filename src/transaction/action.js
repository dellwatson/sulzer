import axios from 'axios'
export const baseURL = "http://api-sulzerabsensi.sobatteknologi.com/api";


export const clearTrigger = () => dispatch => dispatch({ 'type': 'CLEAR_TRANS' })

export const getTransaction = () => (dispatch, getState) => {

    // console.log(getState().home.DATA)
    const { key } = getState().home.DATA.active_project
    const { token } = getState().auth

    let config = {
        headers: { "Authorization": token }
    }


    dispatch({ type: `GET_TRANSACTION_PENDING` })

    return axios.get(baseURL + '/my-attendances-project/' + key, config)

        .then(response => {
            dispatch({
                type: `GET_TRANSACTION_RESOLVED`,
                data: response.data,
                // code: response.status
            });
            return response
        })
        .catch(error => {
            dispatch({
                type: `GET_TRANSACTION_REJECTED`,
                error
            });

            return { error }
        })


}
