import * as yup from 'yup';

export const imageValidationSchema = yup.object().shape({
  url: yup.string().required(),
  user_id: yup.string().nullable(),
  blog_post_id: yup.string().nullable(),
});
