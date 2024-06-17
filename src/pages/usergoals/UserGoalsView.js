import React from 'react'

const UserGoalsView = () => {
  const {
    goaltitle,
    description,
    value,
    criteria,
    achieve_by,
    deadline_near,
    days_remaining,
    setUserGoalState
  } = props;

  const handleEdit = () => {
    setUserGoalState('edit');
  }

  
  return (
    <div>UserGoalsView</div>
  )
}

export default UserGoalsView