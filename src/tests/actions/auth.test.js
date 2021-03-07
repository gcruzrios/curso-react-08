import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import { types } from "../../types/types"
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {}
let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {
    
    beforeEach(()=>{

        store = mockStore(initState);
    })

    test('login y logout deben de crear acción respectiva', () => {

        const uid='ABC123'
        const displayName='Greivin'

        const  loginAction = login( uid, displayName);
        const  logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload:{
                uid,
                displayName
            }
        })
        
        expect(logoutAction).toEqual({
            type: types.logout
        })
    });

    test('debe de realizar el startLogout', async () => {

        await store.dispatch(startLogout());

        const actions = store.getActions();
        //console.log(actions);
        expect (actions[0]).toEqual({
            type: types.logout
        })
        
        expect (actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })
    })

    test('debe de iniciar el startLoginEmailPassword ', async() => {
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

        const actions = store.getActions();
        //console.log(actions);
        expect (actions[1]).toEqual({
            type: types.login,
            payload:{
                uid: 'svos6LyMLrThMFHpVDhcIBkxl7j1', 
                displayName: null 
            }
        })
    })
    
    
})
