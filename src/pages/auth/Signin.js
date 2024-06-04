import React from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {useSetCurrentUser} from '../../context/CurrentUserContext';
import axios from "axios";
import {setTokenTimestamp} from '../../utils/Utils';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../context/GlobalMessageContext";

