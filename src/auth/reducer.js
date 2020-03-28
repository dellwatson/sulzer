
const initState = {
    token: null,
    signin: { isFetching: null, isStatus: null },
    change_password: { isFetching: null, isStatus: null },
    koor: false,

}



export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_AUTH':
            return initState

        case 'SAVE_ACCESS_TOKEN':
            return { ...state, token: action.token }

        case 'SET_KOOR_AUTH':
            return { ...state, koor: action.bool }


        case 'SIGN_IN_PENDING':
            console.log('signin penddiing')
            return { ...state, signin: { isFetching: true } }
        case 'SIGN_IN_REJECTED':
            console.log('signin rejected')
            console.log(action.err)

            return { ...state, signin: { isFetching: false, isStatus: false, ...action.err } }
        case 'SIGN_IN_RESOLVED':
            console.log('signin resolved')
            return { ...state, signin: { isFetching: false, isStatus: true, ...action.data, } }


        case 'CHANGE_PASSWORD_PENDING':
            return { ...state, change_password: { isFetching: true } }
        case 'CHANGE_PASSWORD_RESOLVED':
            return { ...state, change_password: { isFetching: false, isStatus: true, ...action.data } }
        case 'CHANGE_PASSWORD_REJECTED':
            return { ...state, change_password: { isFetching: false, isStatus: false, ...action.err } }

        default:
            return state;
    }
}
