import LoginClass from '../templates/LoginClass';
import {compose} from 'react';
import { connect } from 'react-redux';
import * as Action from '../reducks/users/operations';

const mapStateToProps = state => {
    return {
        users: state.users // ここでは渡したいstateだけをオブジェクト型で記述
    }
};

const mapDispatchToProps = dispatch => {
    return {
        action :{
            signIn(){
                dispatch(Action.signIn()) // storeからDispatchする関数
            }
        }
    }
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(LoginClass);