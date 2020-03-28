
const initState = {
    DATA: {
        isFetching: null, isStatus: null, list: []
    },

    ACCEPT: { isFetching: null, isStatus: null }
}



export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_STAFF':
            return initState

        case 'CLEAR_STAFF_INFO':
            return { ...state, DATA: { isFetching: null, isStatus: null, } }

        case 'GET_STAFF_PENDING':
            return { ...state, DATA: { isFetching: true } }
        case 'GET_STAFF_REJECTED':
            return { ...state, DATA: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_STAFF_RESOLVED':
            console.log('RESOLVED TEAM')
            return { ...state, DATA: { list: action.data, isFetching: false, isStatus: true } }


        case 'UPDATE_ACCEPT_PENDING':
            return { ...state, ACCEPT: { isFetching: true } }
        case 'UPDATE_ACCEPT_REJECTED':
            console.log('reject')
            console.log(action.err)
            return { ...state, ACCEPT: { isFetching: false, isStatus: false, ...action.err } }
        case 'UPDATE_ACCEPT_RESOLVED':
            console.log('success')
            return { ...state, ACCEPT: { isFetching: false, isStatus: true } }



        default:
            return state;
    }
}

