const initState = {
    DATA: {
        isFetching: null, isStatus: null, list: []
    },

    DETAIL: { isFetching: null, isStatus: null, }
}



export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_PROJECTS':
            return initState

        case 'GET_PROJECTS_PENDING':
            return { ...state, DATA: { ...state.DATA, isFetching: true } }
        case 'GET_PROJECTS_REJECTED':
            return { ...state, DATA: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_PROJECTS_RESOLVED':
            return { ...state, DATA: { list: action.data, isFetching: false, isStatus: true } }


        default:
            return state;
    }
}
