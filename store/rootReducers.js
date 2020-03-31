import { combineReducers } from "redux";
import auth from '../src/auth/reducer'
import staff from '../src/team/reducer'
import attendance from '../src/attendance/reducer'
import project from '../src/project/reducer'
import profile from '../src/profile/reducer'


const rootReducer = combineReducers({
    auth,
    profile,
    // home,
    staff,
    attendance,
    // travel,
    // trans,

    project
});

export default rootReducer;
