import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: '',
    },
    phone: ['', ''],
    phNumbers: ['']
}

const onSubmit = values => {
    console.log('Form Data: ', values)
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid Email Format!').required('Required!'),
    channel: Yup.string().required('Required!'),
})

const cmtError = values =>{
    let error;
    if(!values){
        error="Required";
    }
    return error;
}


function YoutubeForm() {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>

            <Form>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <Field
                        id="name"
                        name="name"
                        type="text"
                    />
                    <ErrorMessage name="name" component={TextError} />
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <Field
                        id="email"
                        name="email"
                        type="email"
                    />
                    <ErrorMessage name="email" >
                        {
                            (errorMsg) => (
                                <div className="error">{errorMsg}</div>
                            )
                        }
                    </ErrorMessage>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <Field
                        id="channel"
                        name="channel"
                        type="text"
                        placeholder="Youtube Channel Name"
                    />
                    <ErrorMessage name="channel" />
                </div>

                <div className="form-control">
                    <label htmlFor="comments">Comments</label>
                    <Field
                        id="comments"
                        name="comments"
                        as="textarea"
                        validate={cmtError}
                    />
                    <ErrorMessage name="comments" component={TextError} />
                </div>

                <div className="form-control">
                    <label htmlFor="address">Address</label>
                    <Field name="address">
                        {
                            (props) => {
                                {/* console.log("Render Props: ", props); */ }
                                const { field, form, meta } = props;
                                return (
                                    <div>
                                        <input type="text" id="address" {...field} />
                                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                    </div>
                                )
                            }
                        }
                    </Field>
                </div>

                <div className="form-control">
                    <label htmlFor="facebook">Facebook Profile</label>
                    <Field
                        id="facebook"
                        name="social.facebook"
                        type="text"
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="twitter">Twitter Profile</label>
                    <Field
                        id="twitter"
                        name="social.twitter"
                        type="text"
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="phonep">Phone 1</label>
                    <Field
                        id="phonep"
                        name="phone[0]"
                        type="text"
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="phones">Phone 2</label>
                    <Field
                        id="phones"
                        name="phone[1]"
                        type="text"
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="phone">List Phone Number</label>
                    <FieldArray name="phNumbers">
                        {
                            (fieldArrayProps) => {
                                {/* console.log(fieldArrayProps); */ }
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { phNumbers } = values;
                                return <div>
                                    {
                                        phNumbers.map((phNumber, index) => (
                                            <div key={index}>
                                                <Field name={`phNumbers[${index}]`} />
                                                <button type="button" onClick={() => remove(index)}>-</button>
                                                <button type="button" onClick={() => push('')}>+</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        }
                    </FieldArray>
                </div>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default YoutubeForm;