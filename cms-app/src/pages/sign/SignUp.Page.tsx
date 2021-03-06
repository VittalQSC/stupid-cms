import React from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Joi from "joi";
import { Formik } from 'formik';

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
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({
      'string.pattern.base': 'should contain at least 3 chars or nums'
    }),

  repeatPassword: Joi.ref('password'),
});

export const SignUpPage = observer(withRouter(({ history }) => {
    const config = useConfig();
    const { userStore } = useStore();

    return (
      <Formik
        initialValues={{ username: '', email: '', password: '', repeatPassword: '' }}
        validate={values => {
          const result = schema.validate(values, { abortEarly: false });
          return joiToFormikErrorFormat(result?.error?.details);
        }}
        onSubmit={async (user, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await userStore.register(config.app.API_URL, user.username, user.email, user.password);
              history.push('/');
            } catch (e) {}
            setSubmitting(false)
        }}
      >
        {({
          values, errors, touched,
          handleChange, handleBlur, handleSubmit,
          isSubmitting,
        }) => (
            <Form onSubmit={handleSubmit}>
              <h3>Sign up</h3>
              <InputContainer>
                <AtomInput
                  type="username"
                  name="username"
                  placeholder="User name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {
                  errors && errors.username && errors.username.split(';')
                    .map((message: string) => !!message && (<AtomInputError key={message}>{message}</AtomInputError>))
                }
              </InputContainer>
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
              <InputContainer>
                <AtomInput
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatPassword}
                />
                {
                  errors && errors.repeatPassword && errors.repeatPassword.split(';')
                    .map((message: string) => !!message && (<AtomInputError key={message}>{message}</AtomInputError>))
                }
              </InputContainer>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
        )}
      </Formik>);
}));