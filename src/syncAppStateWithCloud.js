import store from './redux/store';
import {
    syncUserDailyTarget,
    syncChallengers,
    updatePagesReadToday,
    checkIsSyncComplete,
    updateChallengerProgress, 
    syncPagesReadToday, synctotalPagesRead} from './redux/actions';

const syncAppStateWithCloud = docData => {
    store.dispatch(syncUserDailyTarget(docData.dailyTarget))
    let users = docData.users.filter(user => (user.uid !== store.getState().userUid))
    let dailyProgress = docData.dailyProgress
    let challengers = users.map(challenger => ({
        ...challenger,
        progress: dailyProgress[challenger.uid]
    }))
    store.dispatch(syncChallengers(challengers))
    store.dispatch(updatePagesReadToday(parseInt(dailyProgress[store.getState().userUid])))
    store.dispatch(checkIsSyncComplete(true))
    store.dispatch(synctotalPagesRead(docData.totalPagesRead[store.getState().userUid]))
    return console.log(store.getState())
}

export const syncAppStateWithCloudRealTime = docData => {
    store.dispatch(syncUserDailyTarget(docData.dailyTarget))
    let users = docData.users.filter(user => (user.uid !== store.getState().userUid))
    let dailyProgress = docData.dailyProgress
    let userUid = store.getState().userUid
    let challengers = users.map(challenger => ({
        ...challenger,
        progress: dailyProgress[challenger.uid]
    }))
    store.dispatch(synctotalPagesRead(docData.totalPagesRead[userUid]?docData.totalPagesRead[userUid]: 0))
    store.dispatch(syncPagesReadToday(parseInt(dailyProgress[store.getState().userUid])))
    store.dispatch(updateChallengerProgress(challengers))
}


export default syncAppStateWithCloud
