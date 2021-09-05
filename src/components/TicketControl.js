import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    console.log("Button clicked!")
    if (this.state.selectedTicket != null) {
      console.log("selected ticket" + this.state.selectedTicket)
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      console.log("Test")
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleEditClick = () => {
    console.log('handleEditClick reached!');
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== this.state.selectedTicket.id).concat(ticketToEdit);

    this.setState({
      masterTicketList: editedMasterTicketList,
      editing: false,
      selectedTicket: null
    })
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({masterTicketList: newMasterTicketList, formVisibleOnPage: false });
  }


  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null
    });
  }


  //doesnt take you back to queue from detail page
  // handleClick = () => {
  //   this.setState(prevState => ({
  //     formVisibleOnPage: !prevState.formVisibleOnPage
  //   }));
  // }


  render(){
    let currentlyVisibleState = null;
    let buttonText = null; // new code

    if (this.state.editing) {
        currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket}
        onEditTicket = {this.handleEditingTicketInList}/>
        buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
        currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket}
        onClickingEdit = {this.handleEditClick}/>;
        buttonText = "Return to Ticket List"; // new code
    } else if (this.state.formVisibleOnPage){
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
        buttonText = "Return to ticket list";
    } else {
        currentlyVisibleState = <TicketList ticketList = {this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>;
        buttonText = "Add Ticket"; // new code
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> { /* new code */ }
      </React.Fragment>
    );
  }
}

export default TicketControl;