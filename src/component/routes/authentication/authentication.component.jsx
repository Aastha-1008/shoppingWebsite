import {useEffect} from 'react';
import { getRedirectResult } from 'firebase/auth';
import {createUserDocumentFromAuth, auth} from "../../utils/firebase/firebase.utils";
import SignUpForm from '../../sign-up-form/sign-up-form.component';
import SignInForm from '../../sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const SignIn = () => {

    useEffect(()=>{
        const fetchData = async() =>{
            const response = await getRedirectResult(auth);
            if(response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        };
        fetchData();
    },[]);



    return(
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
}

export default SignIn;