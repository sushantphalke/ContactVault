import React, { useReducer } from 'react';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CONTACT_ERROR,
} from '../types';
const ContactState = (props) => {
        const initialState = {
            contacts: null,
            current: null,
            filtered: null,
            error: null,
        };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // GET CONTACT
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };

    //  add contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };
    // delete contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);

            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg,
            });
        }
    };
    // Update contact
    const updateContact = async(contact) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };


    // clear contacts
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS,
        });
    };
    // set current contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };
    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // filter contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    // clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                clearContacts,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
            }}
        >
            {props.children}
        </contactContext.Provider>
    );
};
export default ContactState;
