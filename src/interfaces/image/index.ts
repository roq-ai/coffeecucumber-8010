import { UserInterface } from 'interfaces/user';
import { BlogPostInterface } from 'interfaces/blog-post';
import { GetQueryInterface } from 'interfaces';

export interface ImageInterface {
  id?: string;
  url: string;
  user_id?: string;
  blog_post_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  blog_post?: BlogPostInterface;
  _count?: {};
}

export interface ImageGetQueryInterface extends GetQueryInterface {
  id?: string;
  url?: string;
  user_id?: string;
  blog_post_id?: string;
}
