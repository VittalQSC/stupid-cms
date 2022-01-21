import React from "react";
import { Form, Formik } from "formik";
import Joi from "joi";
import { joiToFormikErrorFormat } from "@utils/joiToFormikErrorFormat";
import { InputContainer } from "@pages/sign/Sign.Styles";
import { AtomInput, AtomInputError } from "@atoms/AtomInput/AtomInput";
import { Button, OutlineButton } from "@atoms/AtomButton/AtomButton";
import { useStore } from "@hooks/useStore";

const schema = Joi.object({
    title: Joi.string().required()
});

export const HeaderWidgetForm = () => {
    const { headerWidgetEditorStore, templateStore } = useStore();

    return (<Formik
        initialValues={{ title: headerWidgetEditorStore.editingTitle }}
        validate={values => {
            const result = schema.validate(values, { abortEarly: false });
            return joiToFormikErrorFormat(result?.error?.details);
        }}
        onSubmit={async (widget: {title: string}, { setSubmitting }) => {
            headerWidgetEditorStore.save(templateStore.edit, widget.title);
        }}
    >{({
        values, errors, touched,
        handleChange, handleBlur, handleSubmit,
        isSubmitting,
    }) => (<Form onSubmit={handleSubmit}>
              <InputContainer>
                <AtomInput
                  type="title"
                  name="title"
                  placeholder="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title || ''}
                />
                {
                  errors && errors.title && errors.title.split(';')
                    .map((message: string) => !!message && (<AtomInputError key={message}>{message}</AtomInputError>))
                }
              </InputContainer>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
              <OutlineButton type="button" onClick={() => templateStore.unregisterWidget(templateStore.edit)} disabled={isSubmitting}>
                Discard
              </OutlineButton>
        </Form>)}
    </Formik>);
};