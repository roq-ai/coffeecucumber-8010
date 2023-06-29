import * as yup from 'yup';

export const upvoteValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  blog_post_id: yup.string().nullable(),
});
