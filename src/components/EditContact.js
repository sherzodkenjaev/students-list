import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

function EditContact() {
    const { id } = useParams();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();

    const contacts = useSelector(state => state);
    const contactExist = contacts.find(contact => contact.id === parseInt(id));

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        if (contactExist) {
            setName(contactExist.name);
            setEmail(contactExist.email);
            setNumber(contactExist.number);
        }
    }, [contactExist])

    const handleChange = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));

        if (!name || !email || !number) {
            return toast.warning("Please fill all required fields")
        }
        if (checkEmail) {
            return toast.error("This email already exists!")
        }
        if (checkNumber) {
            return toast.error("This number already exists!")
        }

        const data = {
            id: parseInt(id),
            name,
            email,
            number,
        }
        dispatch({
            type: "UPDATE_CONTACT",
            payload: data,
        })
        toast.success("Student updated succesfully");
        history.push("/");
    }

    return (
        <div className="container">
            {contactExist ? (
                <div className="row">
                    <h1 className="display-3 text-center">
                        Edit Student {id}
                    </h1>
                    <div className="col-md-6 shadow mx-auto p-5">
                        <form>
                            <div className="input-group">
                                <input type="text" placeholder="Name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <input type="email" placeholder="Email" className="form-control my-3" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <input type="number" placeholder="Number" className="form-control" value={number} onChange={e => setNumber(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <input type="submit" value="Update Student" className="btn btn-block btn-dark mt-3" onClick={handleChange} />
                                <Link to="/" className="btn btn-danger mt-3">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div class="alert alert-danger" role="alert">
                    <h1>Student with id {id} does not exist!!!</h1>
                </div>
            )}

        </div>
    )
}

export default EditContact
