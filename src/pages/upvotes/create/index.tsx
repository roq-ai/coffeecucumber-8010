import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createUpvote } from 'apiSdk/upvotes';
import { Error } from 'components/error';
import { upvoteValidationSchema } from 'validationSchema/upvotes';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { BlogPostInterface } from 'interfaces/blog-post';
import { getUsers } from 'apiSdk/users';
import { getBlogPosts } from 'apiSdk/blog-posts';
import { UpvoteInterface } from 'interfaces/upvote';

function UpvoteCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: UpvoteInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createUpvote(values);
      resetForm();
      router.push('/upvotes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<UpvoteInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      blog_post_id: (router.query.blog_post_id as string) ?? null,
    },
    validationSchema: upvoteValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Upvote
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<BlogPostInterface>
            formik={formik}
            name={'blog_post_id'}
            label={'Select Blog Post'}
            placeholder={'Select Blog Post'}
            fetcher={getBlogPosts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'upvote',
    operation: AccessOperationEnum.CREATE,
  }),
)(UpvoteCreatePage);
