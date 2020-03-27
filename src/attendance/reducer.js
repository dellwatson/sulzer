const initState = {

    DATA: { isFetching: null, isStatus: null, list: [] },
    STAFF: { isFetching: null, isStatus: null, list: [] },
    ABSENCE: { isFetching: null, isStatus: null, list: [] },
    TRAVEL: { isFetching: null, isStatus: null, list: [] },

    PERSON: { isFetching: null, isStatus: null, list: [] },



    UPDATE: { isFetching: null, isStatus: null, },
    ACCEPT: { isFetching: null, isStatus: null, },
    EDIT: { isFetching: null, isStatus: null, },
}



export default (state = initState, action) => {
    switch(action.type) {

        case 'RESET_ATTENDANCE':
            return initState

        case 'CLEAR_TRIGGER_ATTENDANCE':
            return { ...state, UPDATE: { isFetching: null, isStatus: null, } }

        case 'GET_ATTENDANCE_PENDING':
            return { ...state, DATA: { isFetching: true } }
        case 'GET_ATTENDANCE_REJECTED':
            return { ...state, DATA: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_ATTENDANCE_RESOLVED':
            return { ...state, DATA: { list: action.data, isFetching: false, isStatus: true } }


        case 'CLEAR_ATTENDANCE_STAFF':
            return { ...state, STAFF: { isFetching: null, isStatus: null, list: [] }, }

        case 'GET_ATTENDANCE_STAFF_PENDING':
            return { ...state, STAFF: { isFetching: true } }
        case 'GET_ATTENDANCE_STAFF_REJECTED':
            return { ...state, STAFF: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_ATTENDANCE_STAFF_RESOLVED':
            return { ...state, STAFF: { list: action.data, isFetching: false, isStatus: true } }

        case 'GET_PERSON_ATTENDANCE_PENDING':
            return { ...state, PERSON: { isFetching: true } }
        case 'GET_PERSON_ATTENDANCE_REJECTED':
            return { ...state, PERSON: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_PERSON_ATTENDANCE_RESOLVED':
            return { ...state, PERSON: { list: action.data, isFetching: false, isStatus: true } }

        case 'CLEAR_PERSON_ATTENDANCE':
            return { ...state, PERSON: { isFetching: null, isStatus: null, list: [] } }

        case 'GET_ATTENDANCE_ABSENCE_PENDING':

            return { ...state, ABSENCE: { isFetching: true } }
        case 'GET_ATTENDANCE_ABSENCE_REJECTED':

            return { ...state, ABSENCE: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_ATTENDANCE_ABSENCE_RESOLVED':

            return { ...state, ABSENCE: { list: action.data, isFetching: false, isStatus: true } }

        case 'GET_ATTENDANCE_TRAVEL_PENDING':
            return { ...state, TRAVEL: { isFetching: true } }
        case 'GET_ATTENDANCE_TRAVEL_REJECTED':
            return { ...state, TRAVEL: { isFetching: false, isStatus: false, ...action.err } }
        case 'GET_ATTENDANCE_TRAVEL_RESOLVED':
            return { ...state, TRAVEL: { list: action.data, isFetching: false, isStatus: true } }

        case 'TRIGGER_ATTENDANCE_PENDING':
            return { ...state, UPDATE: { isFetching: true } }
        case 'TRIGGER_ATTENDANCE_REJECTED':
            return { ...state, UPDATE: { isFetching: false, isStatus: false, ...action.err } }
        case 'TRIGGER_ATTENDANCE_RESOLVED':
            return { ...state, UPDATE: { ...action.data, isFetching: false, isStatus: true } }

        case 'ACCEPT_ATTENDANCE_PENDING':
            console.log('ACCEPEEETTT PENDING')
            return { ...state, ACCEPT: { isFetching: true } }
        case 'ACCEPT_ATTENDANCE_REJECTED':
            console.log('ACCEPEEETTT REJECTEED')

            return { ...state, ACCEPT: { isFetching: false, isStatus: false, ...action.err } }
        case 'ACCEPT_ATTENDANCE_RESOLVED':
            console.log('ACCEPEEETTT RESOLLVEED')

            return { ...state, ACCEPT: { ...action.data, isFetching: false, isStatus: true } }


        case 'EDIT_ATTENDANCE_PENDING':
            return { ...state, EDIT: { isFetching: true } }
        case 'EDIT_ATTENDANCE_REJECTED':
            return { ...state, EDIT: { isFetching: false, isStatus: false, ...action.err } }
        case 'EDIT_ATTENDANCE_RESOLVED':
            return { ...state, EDIT: { ...action.data, isFetching: false, isStatus: true } }


        default:
            return state;
    }
}

