import React from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Joi from "joi";
import { Formik } from 'formik';
import { History } from 'history';

// atoms
import { AtomInput, AtomInputError } from "@atoms/AtomInput/AtomInput";
import { Button } from "@atoms/AtomButton/AtomButton";

// components
import useConfig from "@components/useConfig";

// hooks
import { useStore } from "@hooks/useStore";


// utils
import { joiToFormikErrorFormat } from "@utils/joiToFormikErrorFormat";

import { Form, InputContainer } from "./Sign.Styles";

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.pattern.base': 'should contain at least 3 chars or nums'
        }),
});

type Props = {
  history: History
};

export const SignInPage = observer(withRouter(({ history }: Props) => {
    const config = useConfig();
    const { userStore } = useStore();

    return (<Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
            const result = schema.validate(values, { abortEarly: false });
            return joiToFormikErrorFormat(result?.error?.details);
        }}
        onSubmit={async (user, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await userStore.login(config.app.API_URL, user.email, user.password);
              history.push('/');
            } catch (e) {}
            setSubmitting(false);
        }}
    >{
        ({
            values, errors, touched,
            handleChange, handleBlur, handleSubmit,
            isSubmitting,
        }) => (<Form onSubmit={handleSubmit}>
            <h3>Sign in</h3>
            <InputContainer>
                <AtomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {
                  errors && errors.email && errors.email.split(';')
                    .map((message: string) => !!message && (<AtomInputError key={message}>{message}</AtomInputError>))
                }
              </InputContainer>
              <InputContainer>
                <AtomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {
                  errors && errors.password && errors.password.split(';')
                    .map((message: string) => !!message && (<AtomInputError key={message}>{message}</AtomInputError>))
                }
              </InputContainer>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
        </Form>)
    }</Formik>);
}));