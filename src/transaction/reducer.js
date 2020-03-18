
const initState = {
    DATA: {
        isFetching: null, isStatus: null, list: [

        ]
    },
}



export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_TRANSACTION':
            return initState

        case 'CLEAR_TRIGGER_TRANSACTION':
            return { ...state, UPDATE: { isFetching: null, isStatus: null, } }


        case 'GET_TRANSACTION_PENDING':
            return { ...state, DATA: { isFetching: true } }
        case 'GET_TRANSACTION_REJECTED':
            return { ...state, DATA: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_TRANSACTION_RESOLVED':
            return { ...state, DATA: { list: action.data, isFetching: false, isStatus: true } }


        default:
            return state;
    }
}



