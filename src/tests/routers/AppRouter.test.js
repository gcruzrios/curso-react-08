import React from 'react';
import { mount } from "enzyme"

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router';
import { firebase } from "../../firebase/firebase-config";
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import Swal from 'sweetalert2';


jest.mock('sweetalert2',()=> ({
    fire:jest.fn(),
}))
jest.mock('../../actions/auth',()=> ({
    login:jest.fn(),
}))
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    },
    notes:{
        active:{
            id:'ABCD',
            
        },
        notes:[]
    }
}
let store = mockStore(initState);
store.dispatch = jest.fn();




describe('Pruebas en AppRouter', () => {
    
    test('debe de llamar al login si no estoy autenticado', async() => {

        let user;

        await act(async()=>{


            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456')

            user = userCred.user;

            //console.log(userCred)
            const wrapper= mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                    
                </Provider>
                )
         });

        expect(login).toHaveBeenCalledWith('svos6LyMLrThMFHpVDhcIBkxl7j1',null);
        
        
    })
    
})
