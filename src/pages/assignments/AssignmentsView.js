import React from "react";
import {axiosReq} from '../../api/axiosDefaults'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from "../../context/GlobalMessageContext";
import axios from "axios";

const AssignmentTask = (props) = > {
    const {
        id,
        name,
        image,
        context,
        today,
        achieved,
        refine,
        achieve_by_info,
        usergoal_achieve_by_info,
        type,
        activeAssignments,
        setActiveAssignments
    } = props;
}

const setShowGlobalSuccess = useSetshowGlobalSuccess();
const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

const handleTodayToggle = async (event) => {
    const checkbox = even.target;
    if (checkbox .checked) {
        try {
            const {data} = await axios.Req.patch(`/assignments/${id}`, {today:true});
            setGlobalSuccessMessage("Your Assignment moved into today");
            setShowGlobalSuccess(true);
            const activeList = activeAssignments.results;
            const assignmentIndex = activeList.findIndex(assignment => assignment.id === id);
            activeList[assignmentIndex] = data;
            setActiveTasks(
                {
                    results: [
                        ...activeList
                    ]
                }
            );
        } catch(err){
            console.log(err)
        }
    } else {
        try {
            const {data} = await.axiosReq.patch(`/assignments/${id}`, {today:false});
            setGlobalSuccessMessage("Your Assignment has been removed from today");
            setShowGlobalSuccess(true);
            const activeList = activeAssignments.results;
            const assignmentIndex = activeList.findIndex(assignment => task.id === id);
            activeList[assignmentIndex] = data;
            setActiveAssignments(
                {
                    results: [
                        ...activeList
                    ]
                }
            );
        } catch(err){
            console.log(err)
        }
    }
}

