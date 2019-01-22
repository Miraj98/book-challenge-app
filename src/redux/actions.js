//action types...
export const UPDATE_PAGES_READ_TODAY = 'UPDATE_PAGES_READ_TODAY'
export const UPDATE_USER_UID = 'UPDATE_USER_UID' 
export const SYNC_CHALLENGERS = 'SYNC_CHALLENGERS'
export const USER_DAILY_TARGET = 'USER_DAILY_TARGET'
export const CHECK_SYNC = 'CHECK_SYNC'
export const UPDATE_CHALLENGER_PROGRESS = 'UPDATE_CHALLENGER_PROGRESS'
export const SYNC_PAGES_READ_TODAY = 'SYNC_PAGES_READ_TODAY'
export const ADD_DISPLAY_NAME = "ADD_DISPLAY_NAME"
export const SYNC_USER_HISTORY = "SYNC_USER_HISTORY"
export const UPDATE_TOTAL_PAGES_READ = "UPDATE_TOTAL_PAGES_READ"
export const SYNC_TOTAL_PAGES_READ = "SYNC_TOTAL_PAGES_READ"


//action creators...
export const updatePagesReadToday = newEntry => ({
    type: UPDATE_PAGES_READ_TODAY,
    payload: newEntry
})

export const updateUserUid = uid => ({
    type: UPDATE_USER_UID,
    payload: uid
})

export const syncChallengers = challengers => ({
    type: SYNC_CHALLENGERS,
    payload: challengers
})

export const syncUserDailyTarget = dailyTarget => ({
    type: USER_DAILY_TARGET,
    payload: dailyTarget
})

export const checkIsSyncComplete = syncState => ({
    type: CHECK_SYNC,
    payload: syncState
})

export const updateChallengerProgress = update => ({
    type: UPDATE_CHALLENGER_PROGRESS,
    payload: update
})

export const syncPagesReadToday = pagesReadToday => ({
    type: SYNC_PAGES_READ_TODAY,
    payload: pagesReadToday
})

export const addDisplayName = displayName => ({
    type: ADD_DISPLAY_NAME,
    payload: displayName
})

export const syncUserHistory = userHistory => ({
    type: SYNC_USER_HISTORY,
    payload: userHistory
})

export const updateTotalPagesRead = totalPagesRead => ({
    type: UPDATE_TOTAL_PAGES_READ,
    payload: totalPagesRead
})

export const synctotalPagesRead = totalPagesRead => ({
    type: SYNC_TOTAL_PAGES_READ,
    payload: totalPagesRead
})