import {EventEmitter} from 'events';
import Dispatcher  from '../appDispatcher';
import actionTypes from '../actions/actionTypesCount';


const CHANGE_EVENT = "change";
let _counts = 0 ;


class _countStore extends EventEmitter {

    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback)
    }
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback)
    }
    emitChange(){
        this.emit(CHANGE_EVENT)
    }
    getCounts(){
        return _counts;
    }
 
}


const store = new _countStore();

Dispatcher.register(action =>{
    switch(action.actionType){

        case actionTypes.MORE_COUNT:
            _counts = _counts + 1
            // debugger;
            store.emitChange();
            break;

        case actionTypes.LESS_COUNT:
            _counts = _counts - 1
            store.emitChange();
            break;

        default:
            break;

    }   
})

export default store;