

const initState = {
    DATA: { isFetching: null, isStatus: null, list: [] },
    UPDATE: { isFetching: null, isStatus: null, }
}



export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_TRAVEL':
            return initState

        case 'CLEAR_TRIGGER_TRAVEL':
            return { ...state, UPDATE: { isFetching: null, isStatus: null, } }


        case 'GET_TRAVEL_PENDING':
            return { ...state, DATA: { isFetching: true } }
        case 'GET_TRAVEL_REJECTED':
            return { ...state, DATA: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_TRAVEL_RESOLVED':
            return { ...state, DATA: { list: action.data, isFetching: false, isStatus: true } }

        case 'TRIGGER_TRAVEL_PENDING':
            return { ...state, UPDATE: { isFetching: true } }
        case 'TRIGGER_TRAVEL_REJECTED':

            return { ...state, UPDATE: { isFetching: false, isStatus: false, ...action.err } }
        case 'TRIGGER_TRAVEL_RESOLVED':
            console.log('resolveddd reducer')
            return { ...state, UPDATE: { ...action.data, isFetching: false, isStatus: true } }


        default:
            return state;
    }
}

