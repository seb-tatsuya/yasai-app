import {
    createStore as reduxCreateStore,
    combineReducers
} from 'redux';

import {ProductsReducer} from '../products/reducers';
import { UsersReducer } from '../users/reducers';

export defalut function createStore(){
    return reduxCreateStore (
        combineReducers({
            // 管理したいstateが増えればreducerも増える
            products: ProductsReducer,
            users: UsersReducer
        })
    );
}

