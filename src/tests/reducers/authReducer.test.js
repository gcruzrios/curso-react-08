import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('Pruebas en AuthReducer', () => {
    test('Debe de mostrar algo en la acción login', () => {
        const initState = {};

        const action = {
            type: types.login,
            payload:{
                uid:'abc',
                displayName:'Greivin'
            }
        };

        const state = authReducer( initState, action);
        //console.log (state);
        expect (state).toEqual({
            uid:'abc',
            name:'Greivin'
        });
    })
    
    test('Debe de mostrar algo en la acción logout', () => {
        const initState = {
            uid:'abc',
            name:'Greivin'
        };

        const action = {
            type: types.logout,
            
        };

        const state = authReducer( initState, action);
        //console.log (state);
        expect (state).toEqual({});
    })
    
    test('No Debe de hacer cambios en state', () => {
        const initState = {
            uid:'abc',
            name:'Greivin'
        };

        const action = {
            type: 'jshkshfdk',
            
        };

        const state = authReducer( initState, action);
        //console.log (state);
        expect (state).toEqual(initState);
    })
})
