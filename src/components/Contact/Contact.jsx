import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contacts/contactsSlice";
import { useSelector, useDispatch } from "react-redux";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const onDeleteContact = (id) => {
    const action = deleteContact(id);
    dispatch(action);
  };
  
  return (
    <>
      <ul className={css.contactList}>
        <li className={css.contactListItem}>
          <p className={css.contactP}>{name}</p>
          <p className={css.contactP}>{number}</p>
          <button
            className={css.contactBtn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      </ul>
    </>
  );
};

export default Contact;
