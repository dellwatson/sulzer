// import { AsyncStorage } from 'react-native'
// import base64 from 'react-native-base64'

const initState = {
    token: null,
    // token: "Bearer eyJpdiI6IkZaNjdXTkFEa0hiMDdNNXN0Skx5WlE9PSIsInZhbHVlIjoiV3RwMnVUNTA4UFd2MHpoWm84U01TQT09IiwibWFjIjoiNjg5YTNmMTU4MDhhNmRkMzc1YzRkYmFmMWU0ZDFkNDkyMjEyZGU3MDkyMzdlNWFmMmJiYzM1NDY3OWRmZWI0YyJ9",
    // token: 'Bearer eyJpdiI6IkJjOUlBNVdaSWY0ZHlUMkJJeGR5WFE9PSIsInZhbHVlIjoiRFBwWDRhK3l6bzJ1Y2lyeUt3bWNhdz09IiwibWFjIjoiOGM5YmE0ZjQ2YWEyMDQyZGY4NGJkYmU3Yzg4MDZkYmEzOGQ4ZjQzNWZiNTMyMDRmY2JlZTkxZWQwMDNmYmQ3ZSJ9',

    signin: { isFetching: null, isStatus: null },
    change_password: { isFetching: null, isStatus: null },
    koor: false,


    user: null,
    data_dashboard: { isFetching: null, isStatus: null },
    notifikasi_list: { isFetching: null, isStatus: null, data: [] },
    read_notifikasi: { isFetching: null, isStatus: null },
}

// _storeData = async (title, value) => {
//     try {
//         await AsyncStorage.setItem(title, value);
//     } catch(error) {
//         // Error saving data
//     }
// };


export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_AUTH':
            return initState

        case 'SAVE_ACCESS_TOKEN':
            return { ...state, token: action.token }

        case 'SET_KOOR_AUTH':
            return { ...state, koor: action.bool }


        case 'SIGN_IN_PENDING':
            return { ...state, signin: { isFetching: true } }
        case 'SIGN_IN_REJECTED':
            return { ...state, signin: { isFetching: false, isStatus: false, ...action.err } }
        case 'SIGN_IN_RESOLVED':
            return { ...state, signin: { ...action.data, isFetching: false, isStatus: true }, token, user }


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


/**
 * checkToken
 *
 * Sign in
 */