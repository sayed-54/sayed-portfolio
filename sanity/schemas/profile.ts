export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Hero Bio',
      type: 'text',
    },
    {
      name: 'aboutMe',
      title: 'About Me Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
