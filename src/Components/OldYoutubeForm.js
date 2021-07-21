import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    name: '',
    email: '',
    channel: ''
}

const onSubmit = values => {
    console.log('Form Data: ', values)
}

const validate = values => {
    let errors = {}

    if (!values.name) {
        errors.name = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
        errors.email = 'Invalid Email Format';
    }

    if (!values.channel) {
        errors.channel = 'Required';
    }
    return errors;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid Email Format!').required('Required!'),
    channel: Yup.string().required('Required!'),
})

function OldYoutubeForm() {

    // Managing form state, Handling form submission, Validation and error msg
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        // validate,
    });

    console.log('Form Data: ', formik.values);
    console.log('Form Error: ', formik.errors);
    console.log('Visited Field: ', formik.touched);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}

                </div>

                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input
                        id="channel"
                        name="channel"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.channel}
                    />
                    {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div> : null}
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default OldYoutubeForm;