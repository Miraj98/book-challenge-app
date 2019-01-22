import {
    UPDATE_PAGES_READ_TODAY,
    UPDATE_USER_UID,
    SYNC_CHALLENGERS,
    USER_DAILY_TARGET,
    CHECK_SYNC,
    UPDATE_CHALLENGER_PROGRESS,
    SYNC_PAGES_READ_TODAY,
    ADD_DISPLAY_NAME,
    SYNC_USER_HISTORY,
    UPDATE_TOTAL_PAGES_READ,
    SYNC_TOTAL_PAGES_READ} from './actions';
import {combineReducers} from 'redux';

const pagesReadTodayReducer = (state = 0, action) => {
    if(action.type === UPDATE_PAGES_READ_TODAY) return (state + action.payload)
    if(action.type === SYNC_PAGES_READ_TODAY) return (action.payload)
    return state
}

const userUidReducer = (state = '', action) => {
    if(action.type === UPDATE_USER_UID) return action.payload
    return state
}

const challengersReducer = (state=[], action) => {
    if(action.type === SYNC_CHALLENGERS) return [...state, ...action.payload]
    if(action.type === UPDATE_CHALLENGER_PROGRESS) return [...action.payload]
    return state
}

const dailyTargetReducer = (state = 0, action) => {
    if(action.type === USER_DAILY_TARGET) return action.payload
    return state
}

const syncCompleteReducer = (state = false, action) => {
    if(action.type === CHECK_SYNC) return action.payload
    return state
}

const displayNameReducer = (state = 'Hey Champ', action) => {
    if(action.type === ADD_DISPLAY_NAME) return action.payload
    return state
}

const userHistoryReducer = (state=[], action) => {
    if(action.type === SYNC_USER_HISTORY) return [...action.payload]
    return state
}

const totalPagesReadReducer = (state = 0, action) => {
    if(action.type === UPDATE_TOTAL_PAGES_READ) return (state + action.payload)
    if (action.type === SYNC_TOTAL_PAGES_READ) return (action.payload)
    return state
}

const reducers = combineReducers({
    userUid: userUidReducer,
    pagesReadToday: pagesReadTodayReducer,
    challengers: challengersReducer,
    dailyTarget: dailyTargetReducer,
    isSyncComplete: syncCompleteReducer,
    displayName: displayNameReducer,
    userHistory: userHistoryReducer,
    totalPagesRead: totalPagesReadReducer
})

export default reducers 

