export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
    },
    {
      name: 'iconName',
      title: 'Icon Name (React Icons)',
      type: 'string',
      description: 'The name of the icon to use from react-icons (e.g., FaReact, SiNextdotjs)',
    },
    {
      name: 'icon',
      title: 'Icon SVG/Image',
      type: 'image',
      description: 'Optional: Upload an icon image if not using react-icons',
    },
    {
      name: 'color',
      title: 'Icon Color',
      type: 'string',
      description: 'Hex code or CSS color (e.g., #teal-500 or #00f0ff)',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
};
