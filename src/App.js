import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBBadge,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard
} from "mdbreact";
import "./index.css";
import "./App.css";

class Event extends Component {
  // state = {};
  render() {
    return (
      <React.Fragment>
        <div className="media mt-1">
          <h3 className="h3-responsive font-weight-bold mr-3">
            {this.props.time}
          </h3>
          <div className="media-body mb-3 mb-lg-3">
            <MDBBadge
              color="danger"
              className="ml-2 float-right"
              onClick={() => this.props.onDelete(this.props.id)}
            >
              x
            </MDBBadge>
            <h6 className="mt-0 font-weight-bold">{this.props.title} </h6>{" "}
            <hr className="hr-bold my-2" />
            {this.props.location && (
              <React.Fragment>
                <p className="font-smaller mb-0">
                  <MDBIcon icon="fas fa-map-marker-alt" className="red-text" />{" "}
                  {this.props.location}
                </p>
              </React.Fragment>
            )}
          </div>
        </div>
        {this.props.description && (
          <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
            {this.props.description}
          </p>
        )}
      </React.Fragment>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      events: [
        {
          id: 1,
          time: "10:00",
          title: "Pacto com o capiroto",
          location: "Hell",
          description:
            "Omnis immundus spiritus Omnis satanica potestas Omnis incursio infernalis adversarii"
        },
        {
          id: 2,
          time: "10:30",
          title: "Daily Standup Meeting (recurring)",
          location: "Warsaw Spire Office"
        },
        { id: 3, time: "11:00", title: "Call with HRs" },
        {
          id: 4,
          time: "11:00",
          title: "Lunch with Timothy",
          location: "Canteen",
          description: "Eat some noodles"
        }
      ]
    };
  }

  handleDelete = eventId => {
    console.log(eventId);
    const events = this.state.events.filter(e => e.id !== eventId);
    this.setState({ events });
    console.log("State", this.state.events);
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleInputChange = inputName => value => {
    const nextValue = value;
    this.setState({
      [inputName]: nextValue
    });
  };

  addEvent = () => {
    var newArray = [...this.state.events];
    newArray.push({
      id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
      time: this.state.time,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description
    });
    this.setState({ events: newArray });
    this.setState({
      time: "",
      title: "",
      location: "",
      description: ""
    });
  };

  render() {
    return (
      <div className="App">
        <MDBContainer className="mt-5">
          <MDBRow>
            <MDBCol md="3">
              <MDBCard className="px-5 pt-3">
                <h3 className="text-uppercase my-3">Schedule</h3>
                <h6 className="my-3">
                  It's going to be busy that today. You have{" "}
                  <b>{this.state.events.length} events </b> today.
                </h6>
                <h1 className="my-3">
                  <MDBRow>
                    <MDBCol xs="3" className="text-center">
                      <MDBIcon icon="sun" fixed />
                    </MDBCol>
                    <MDBCol xs="9">Sunny</MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol xs="3" className="text-center">
                      <MDBIcon icon="thermometer-three-quarters" fixed />
                    </MDBCol>
                    <MDBCol xs="9">23°C</MDBCol>
                  </MDBRow>
                </h1>
                <p>
                  Don't forget your sunglasses. Today will dry and sunny,
                  becoming warm in the afternoon with temperatures of between 20
                  and 25 degrees.
                </p>
              </MDBCard>
            </MDBCol>
            <MDBCol md="9">
              <MDBCard className="px-5 pt-3">
                <h2 className="text-uppercase my-3">Today:</h2>
                <div className="schedule-items">
                  {this.state.events.map(event => (
                    <Event
                      key={event.id}
                      time={event.time}
                      id={event.id}
                      title={event.title}
                      location={event.location}
                      description={event.description}
                      onDelete={this.handleDelete}
                    />
                  ))}
                </div>

                <div className="text-center pb-2 mt-4">
                  <MDBBtn rounded color="elegant" onClick={this.toggleModal}>
                    Add New <MDBIcon icon="plus" className="ml-1" />
                  </MDBBtn>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
          >
            Add new event
          </MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 grey-text">
              <MDBInput
                name="time"
                label="Time"
                icon="clock"
                hint="12:30"
                group
                type="text"
                getValue={this.handleInputChange("time")}
              />
              <MDBInput
                name="title"
                label="Title"
                icon="edit"
                hint="Briefing"
                group
                type="text"
                getValue={this.handleInputChange("title")}
              />
              <MDBInput
                name="location"
                label="Location (optional)"
                icon="map"
                group
                type="text"
                getValue={this.handleInputChange("location")}
              />
              <MDBInput
                name="description"
                label="Description (optional)"
                icon="sticky-note"
                group
                type="textarea"
                getValue={this.handleInputChange("description")}
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn
              color="elegant"
              onClick={() => {
                this.toggleModal();
                this.addEvent();
              }}
            >
              Add
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default App;
