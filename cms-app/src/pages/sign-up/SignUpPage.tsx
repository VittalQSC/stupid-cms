import React from "react";
import Joi from "joi";
import { Formik } from 'formik';
import { AtomInput, AtomInputError } from "@atoms/AtomInput/AtomInput";
import { Button } from "@atoms/AtomButton/AtomButton";
import styled from "styled-components";
import { observer } from "mobx-react";
import useConfig from "@components/useConfig";
import { useStore } from "@hooks/useStore";

const Form = styled.form`
    display: flex;
    padding: 20px 20%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 70px;
    width: 100%;
`;

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeatPassword: Joi.ref('password'),
});

function joiToFormikErrorFormat(details: Joi.ValidationErrorItem[] | undefined = []): {[name: string]: string} {
    return details.reduce((errors: { [path: string]: string }, currError) => {
        currError.path.forEach((path) => {
          if (!errors[path]) {
            errors[path] = '';
          }
          errors[path] += `;${currError.message}`;
        });
        
        return errors;
    }, {});
}

export const SignUpPage = observer(() => {
    const config = useConfig();
    const { userState } = useStore();

    return (
      <Formik
        initialValues={{ username: '', email: '', password: '', repeatPassword: '' }}
        validate={values => {
          const result = schema.validate(values, { abortEarly: false });
          return joiToFormikErrorFormat(result?.error?.details);
        }}
        onSubmit={(user, { setSubmitting }) => {
            setSubmitting(true);
            userState.register(config.app.API_URL, user.username, user.email, user.password)
              .catch(() => {})
              .finally(() => setSubmitting(false));
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
});