import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/contactsSlice";
import { selectNameFilter } from "../../redux/filter/filterSlice";

const ContactList = ({}) => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  // console.log(contacts);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredContacts.map((contactItem) => {
        return (
          <Contact
            name={contactItem.name}
            number={contactItem.number}
            key={contactItem.id}
            id={contactItem.id}
          />
        );
      })}
    </div>
  );
};

export default ContactList;
