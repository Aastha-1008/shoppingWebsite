import { useState,useContext } from "react";
import { signInAuthUserWithEmailAndPassword ,signInWithGooglePopup} from "../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../context/user.context";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            setCurrentUser(user);
           resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/invalid-credential':
                    alert('Incorrect password for email');
                    break;

                case 'auth/user-not-found':
                    alert('No user associted with this email');
                    break;
                case 'auth/cancelled-popup-request':
                    break;
                case 'auth/popup-closed-by-user':
                    break;
                default : 
                    console.log('user creation encountered an error : ',error);
                    break;
            }
            
        }
    }

    const signInWithGoogle = async() =>{
        const {user} = await signInWithGooglePopup();
    };

    return (


        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit}>
                
                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />
                <div className="buttons-container">
                    <Button  type="submit"> Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;