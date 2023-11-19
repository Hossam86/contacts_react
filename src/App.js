import logo from "./logo.svg";
import "./App.css";
import ListContacts from "./ListContacts";
import { Component } from "react";
import * as ContactAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";

class App extends Component {
  state = {
    contacts: [],
    screen: "list",
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
        {this.state.screen === "list" && (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            onNavigate={() => {
              this.setState(() => ({ screen: "create" }));
            }}
          />
        )}
        {this.state.screen === "create" && <CreateContact />}
      </div>
    );
  }
}

export default App;
