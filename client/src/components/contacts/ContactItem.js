import React, { useContext } from 'react';
import {
    MdOutgoingMail,
    MdPhoneInTalk,
    MdOutlineStarOutline,
    MdHome,
    MdChat,
} from 'react-icons/md';
import { BsTrash, BsVectorPen } from 'react-icons/bs';
import ContactContext from '../../context/contact/contactContext';

export const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;
    const { _id, name, email, phone, address, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name.charAt(0).toUpperCase() + name.slice(1)}
                {'   '}
                <MdOutlineStarOutline style={{ marginLeft: '1em' }} />
                <span
                    style={{ float: 'right' }}
                    className={
                        type === 'Professional'
                            ? 'badge-primary'
                            : 'badge-success'
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <div style={{ display: 'flex' }}>
                <button
                    className='btn-sm'
                    style={{ marginInlineEnd: '1em' }}
                    onClick={() => setCurrent(contact)}
                >
                    <div>
                        <BsVectorPen
                            style={{ fontSize: '130%', color: 'blue' }}
                        />
                    </div>
                    Edit
                </button>
                <button
                    className='btn-sm'
                    style={{ marginInlineEnd: '1em' }}
                    onClick={onDelete}
                >
                    <div>
                        <BsTrash style={{ fontSize: '130%', color: 'red' }} />
                    </div>
                    Delete
                </button>
            </div>
            <ul className='list'>
                {email && (
                    <li className='list-item'>
                        <div>
                            <a href={`mailto:${email}`}>
                                {' '}
                                <MdOutgoingMail
                                    style={{ fontSize: '150%', color: 'blue' }}
                                />
                            </a>
                        </div>
                        <div>
                            <a href={`mailto:${email}`}> {email}</a>
                        </div>
                    </li>
                )}
                {phone && (
                    <li className='list-item'>
                        <div>
                            <a href={`tel:${phone}`}>
                                <MdPhoneInTalk
                                    style={{ fontSize: '150%', color: 'green' }}
                                />
                            </a>
                        </div>

                        <div>
                            <a href={`tel:${phone}`}> {phone}</a>
                        </div>
                    </li>
                )}
                {phone && (
                    <li className='list-item'>
                        <div>
                            <a href={`whatsapp://call?number=${phone}`}>
                                <MdPhoneInTalk
                                    style={{ fontSize: '150%', color: 'green' }}
                                />
                            </a>
                        </div>

                        <div>
                            <a href={`whatsapp://call?number=${phone}`}>
                                WhatsApp Call
                            </a>
                        </div>
                    </li>
                )}
                {phone && (
                    <li className='list-item'>
                        <div>
                            <a
                                href={`https://wa.me/${phone.replace(
                                    '+',
                                    ''
                                )}?text=${encodeURIComponent('Hi. This is ')}`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <MdChat
                                    style={{ fontSize: '150%', color: 'green' }}
                                />
                            </a>
                        </div>

                        <div>
                            <a
                                href={`https://wa.me/${phone.replace(
                                    '+',
                                    ''
                                )}?text=${encodeURIComponent('Hi. This is ')}`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                WhatsApp Message
                            </a>
                        </div>
                    </li>
                )}
                {address && (
                    <li className='list-item'>
                        <div>
                            <MdHome
                                style={{ fontSize: '150%', color: 'green' }}
                            />
                        </div>
                        <div>{address}</div>
                    </li>
                )}
            </ul>
        </div>
    );
};
