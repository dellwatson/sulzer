
const initState = {
    DATA: {
        isFetching: null, isStatus: null,
    },
}



export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_SESSION':
            return initState


        case 'GET_SESSION_PENDING':
            console.log('pending')
            return { ...state, DATA: { isFetching: true } }
        case 'GET_SESSION_REJECTED':
            console.log('rejected')

            return { ...state, DATA: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_SESSION_RESOLVED':
            console.log('session success')

            return { ...state, DATA: { ...action.data, isFetching: false, isStatus: true } }



        default:
            return state;
    }
}

