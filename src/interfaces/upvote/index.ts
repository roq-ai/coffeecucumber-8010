import { UserInterface } from 'interfaces/user';
import { BlogPostInterface } from 'interfaces/blog-post';
import { GetQueryInterface } from 'interfaces';

export interface UpvoteInterface {
  id?: string;
  user_id?: string;
  blog_post_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  blog_post?: BlogPostInterface;
  _count?: {};
}

export interface UpvoteGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  blog_post_id?: string;
}
