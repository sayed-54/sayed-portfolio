import { groq } from 'next-sanity';

export const projectsQuery = groq`
  *[_type == "project"] {
    _id,
    name,
    description,
    "image": image.asset->url,
    url,
    github,
    techStack[]-> {
      name,
      iconName,
      color
    }
  }
`;

export const skillsQuery = groq`
  *[_type == "skill"] {
    _id,
    name,
    iconName,
    color,
    "icon": icon.asset->url
  }
`;

export const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    role,
    bio,
    aboutMe,
    image
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] {
    _id,
    quote,
    author
  }
`;
