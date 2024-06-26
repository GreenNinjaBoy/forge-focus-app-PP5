import React, {useState} from "react";
import pageStyles from '../../styles/Page.module.css'
import formStyles from '../../styles/Form.module.css'
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSetCurrentUser} from '../../context/CurrentUserContext';
import axios from "axios";
import {setTokenTimestamp} from '../../utils/Utils';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../context/GlobalMessageContext";

function Signin() {

    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    const setCurrentUser = useSetCurrentUser();

    const [signInData, setSignInData] = useState({
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {data} = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            setGlobalSuccessMessage("You are onw signed in.");
            setShowGlobalSuccess(true);
            history.push('/');
        } catch(err){
            console.log(err)
            setErrors(err.response?.data || {});
        }
    };

    return (
    <div className={pageStyles.PageContainer}>
        <div className={pageStyles.SpaceTitle}>
            <div className={pageStyles.Title}>
            <img alt=""/>
            <h1>Log Into Your user Account</h1>
            </div>
        </div>
        <div className={`${pageStyles.ContentContainer} ${formStyles.FormContainer}`}>
        <Form onSubmit={handleSubmit}>
        {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx}>
            {message}
            </Alert>
        ))}

        {errors.username?.map((message, idx) => (
            <Alert key={idx}>
            {message}
            </Alert>
        ))}
        <Form.Group controlId="username" className={formStyles.FormGroup}>
            <Form.Label className={formStyles.FormLabel}>Username:</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={handleChange}
            />
            </Form.Group>

            {errors.password?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
                {message}
            </Alert>
            ))}
        <Form.Group controlId="password" className={`${formStyles.FormGroup} ${formStyles.FinalGroup}`}>
            <Form.Label className={formStyles.FormLabel}>Password:</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            </Form.Group>

            <Button className={`${formStyles.SubmitButton}`} type="submit">
            Sign In
            </Button>
        </Form>

        </div>
    </div>
  )
}

export default Signin