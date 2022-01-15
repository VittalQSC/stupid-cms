import Joi from "joi";

export function joiToFormikErrorFormat(details: Joi.ValidationErrorItem[] | undefined = []): {[name: string]: string} {
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