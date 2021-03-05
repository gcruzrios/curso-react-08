import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import firebase from 'firebase/app';
//import firebase from '../firebase/firebase-config';

import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true);

    const [isLoggedIn,SetIsLoggedIn] = useState(false)

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user )=>{
            //console.log(user);
            if ( user?.uid){
                dispatch(login( user.uid, user.displayName));
                SetIsLoggedIn(true);
            }else{
                SetIsLoggedIn(false);
            }

            setChecking(false);
            
        })
        
    }, [dispatch, setChecking, SetIsLoggedIn])

    if(checking){
        return(
            <h1>Espere...</h1>
        )
    }

    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <PublicRoute 
                            path="/auth" 
                            component={ AuthRouter }
                            isAuthenticated={isLoggedIn}
                        />
                        <PrivateRoute 
                            exact 
                            isAuthenticated={isLoggedIn}
                            path="/" 
                            component={ JournalScreen }/>
            
                        <Redirect to="/auth/login" />


                    </Switch>
                </div>

                
            </Router>
        </div>
    )
}
