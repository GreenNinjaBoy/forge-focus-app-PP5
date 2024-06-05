import React, {useState} from "react";
import { Alert } from "react-bootstrap";
import {Button} from "react-bootstrap";
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
        <div>
        <Form>
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
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={handleChange}
            />
            </Form.Group>

            {errors.password?.map((message, idx) => (
            <Alert key={idx}>
                {message}
            </Alert>
            ))}
        <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            </Form.Group>

            <Button type="submit">
            Sign In
            </Button>
        </Form>

        </div>
    </div>
  )
}

export default Signin