const mapping: Record<string, string> = {
  'blog-posts': 'blog_post',
  images: 'image',
  organizations: 'organization',
  upvotes: 'upvote',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
