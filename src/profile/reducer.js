
const initState = {
    DATA: {
        isFetching: null, isStatus: null,
    },

    offline_behaviour: {
        isLoading: null,
        hasFinishedLoadOffline: null,
        count: 0
    }
}



export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_SESSION':
            return initState

        case 'SET_LOADING':
            return { ...state, offline_behaviour: { ...state.offline_behaviour, isLoading: action.bool } }
        case 'SET_LOAD_OFFLINE':
            return { ...state, offline_behaviour: { ...state.offline_behaviour, hasFinishedLoadOffline: action.bool } }
        case 'SET_COUNT':
            return { ...state, offline_behaviour: { ...state.offline_behaviour, count: action.count } }



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

