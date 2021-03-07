import React from 'react';
import { mount } from "enzyme"
import { LoginScreen } from "../../../components/auth/LoginScreen"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';



jest.mock('../../../actions/auth',()=> ({
    startGoogleLogin:jest.fn(),
    startLoginEmailPassword:jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    }
}
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper= mount(
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
        
    </Provider>
    )
describe('Pruebas en LoginScreen', () => {

    beforeEach(()=>{

        store = mockStore(initState);
        jest.clearAllMocks();
    })


    test('Debe mostrarse correctamente ', () => {

        expect(wrapper).toMatchSnapshot();
        
    });

    test('debe disparar la acción de startGoogleLogin', () => {
       wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    })

    test('debe disparar el StartLogin con los respectivos argumentos', () => {
       wrapper.find('form').prop('onSubmit')({
           preventDefault(){}
       });
       expect(startLoginEmailPassword).toHaveBeenCalledWith('nando@gmail.com','123456');
    })
    
    
    
})
