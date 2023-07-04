import { Component } from 'react';
import { FormPhone } from './formPhoneBook/formPhoneBook';
import { ContactList } from './contactList/contactList';
import { Filter } from './filter/filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = (name, number) => {
    const isExistingContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      return alert(`${name} is already in contact`);
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDelete = id => {
    this.setState(prevState => {
      const newUserList = prevState.contacts.filter(
        contact => contact.id !== id
      );
      return { contacts: newUserList };
    });
  };
  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  componentDidMount() {
    const stringifiedContact = localStorage.getItem("contacts");
    const contactsStorage = JSON.parse(stringifiedContact);
    if (contactsStorage && contactsStorage.length > 0) {
      this.setState({ contactsStorage })
     
    }
    else {
      this.setState(this.state.contacts)
    }

    
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.lengts !== this.state.contacts.length) {
      const stringContacts = JSON.stringify(this.state.contacts)
        localStorage.setItem("contacts", stringContacts)
    }
  }

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div>
        <FormPhone onAddContact={this.handleAddContact} />
        <Filter
          onFilterChange={this.handleFilterChange}
          filter={this.state.filter}
        />
        <ContactList contacts={filteredContacts} onDelete={this.handleDelete} />
      </div>
    );
  }
}
