import logo from "./logo.svg";
import "./App.css";
import ListContacts from "./ListContacts";
import { Component } from "react";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route, Routes } from "react-router-dom";

class App extends Component {
  state = {
    contacts: [],
  };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({ contacts }));
    });
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id != contact.id;
      }),
    }));
    ContactsAPI.remove(contact);
  };

  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact]),
      }));
    });
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
          <Route
            path="/create"
            element={
              <CreateContact
                onCreateContact={(contact) => {
                  this.createContact(contact);
                }}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
