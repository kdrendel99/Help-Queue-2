import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from './ReusableForm';

function NewTicketForm(props){
  function handleNewTicketFormSubmission(event){
    event.preventDefault();
    // Because a function component doesn't have this as a reference like a class component, we need to directly refer to the props passed into the function component. That's why we do props.onNewTicketCreation() instead of this.onNew...(like if this were a class component). remember the props in this function is is the callback from the parent componend even though it has a different name now. from TicketControl
    // When we call props.onNewTicketCreation({names: names.value, location: location.value, issue: issue.value}); in the NewTicketForm component, this object is passed in as an argument to the newTicket parameter, updating the masterTicketList.
    props.onNewTicketCreation(
      {
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: v4()
      });
    // console.log(event.target.names.value);
    // console.log(event.target.location.value);
    // console.log(event.target.issue.value);
  }
  return (
    
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler = {handleNewTicketFormSubmission}
        buttonText="Help!"/>

  {/* We updated this form to use the reusable form from the ReusableForm.js. now, we can dry up our code by using the same form to edit a ticket as we do to create one. */}
      {/* <form onSubmit={handleNewTicketFormSubmission}>
        <input 
          type="text"
          name="names"
          placeholder="Pair Names"/>
        <input
          type="text"
          name="location"
          placeholder="Location"/>
        <textarea
          name="issue"
          placeholder="Describe your issue."/>
        <button type="submit">Help!</button>
        
      </form> */}
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;