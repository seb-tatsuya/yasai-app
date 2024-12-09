import {createSelector} from 'reselect';

// selector=storeで管理しているstateを参照する関数
const usersSelector = (state) => state.users;

// storeで管理しているusersのuidを取得する関数
export const getUserId = createSelector(
    [usersSelector],
    state => state.uid // initialstateのuid
)