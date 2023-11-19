import logo from "./logo.svg";
import "./App.css";
import ListContacts from "./ListContacts";
import { Component } from "react";
import * as ContactAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route, Routes } from "react-router-dom";

class App extends Component {
  state = {
    contacts: [],
  };
  componentDidMount() {
    ContactAPI.getAll().then((contacts) => {
      this.setState(() => ({ contacts }));
    });
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id != contact.id;
      }),
    }));
    ContactAPI.remove(contact);
  };
  render() {
    return (
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ListContacts
                contacts={this.state.contacts}
                onDeleteContact={this.removeContact}
              />
            }
          />
          <Route path="/create" Component={CreateContact} />
        </Routes>
      </div>
    );
  }
}

export default App;
