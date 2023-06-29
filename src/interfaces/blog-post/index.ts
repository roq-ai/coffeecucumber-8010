import { ImageInterface } from 'interfaces/image';
import { UpvoteInterface } from 'interfaces/upvote';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface BlogPostInterface {
  id?: string;
  title: string;
  content: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  image?: ImageInterface[];
  upvote?: UpvoteInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    image?: number;
    upvote?: number;
  };
}

export interface BlogPostGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  user_id?: string;
  organization_id?: string;
}
