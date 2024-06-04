import React from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {useCurrentUser, useSetCurrentUser} from '../../context/CurrentUserContext';
import axios from "axios";
import {setTokenTimestamp} from '../../utils/Utils';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../context/GlobalMessageContext";

function Signin() {

    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    const setCurrentUser = useCurrentUser();

    const [signInData, setSignInData] = useSate({
        username: '',
        password: ''
    });

    const {username, password } = signInData;

    const history = useHistory();

    const [errors,setErrors] = useState({});

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event => {
        event.prevent.default();
        try{
            const {data} = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            setGlobalSuccessMessage("You are onw signed in.");
            setShowGlobalSuccess(true);
            history.push('/');
        } catch(err){
            console.log(err)
            setErrors(err.response?.data);
        }
    };

  return (
    <div>
        <div>
            <div>
            <img/>
            <h1>Log Into Your user Account</h1>
            </div>
        </div>
        
    </div>
  )
}

export default Signin