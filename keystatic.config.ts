import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  ui: {
    brand: { name: 'Unicode CMS' },
  },
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'Slug (Legacy)', description: 'Do not edit unless necessary.' }),
        date: fields.date({
          label: 'Date',
          validation: { isRequired: true }
        }),
        author: fields.text({ label: 'Author', defaultValue: 'DJ Unicode' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'content/data/projects/*',
      format: 'json',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'Slug (Legacy)' }),
        desc: fields.text({ label: 'Description', multiline: true }),
        img_cover: fields.image({
          label: 'Cover Image',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        img: fields.array(
          fields.image({
            label: 'Project Image',
            directory: 'public/images/projects',
            publicPath: '/images/projects/',
          }),
          { label: 'Images' }
        ),
        stack: fields.array(fields.text({ label: 'Stack' }), { label: 'Tech Stack', itemLabel: props => props.value }),
        tech: fields.array(fields.text({ label: 'Tech Category' }), { label: 'Tech Category', itemLabel: props => props.value }),
        contributors: fields.object({
          BEmentors: fields.array(fields.relationship({ label: 'Mentor', collection: 'members' }), { label: 'BE Mentors', itemLabel: props => props.value || 'Mentor' }),
          TEmentors: fields.array(fields.relationship({ label: 'Mentor', collection: 'members' }), { label: 'TE Mentors', itemLabel: props => props.value || 'Mentor' }),
          SEmentees: fields.array(fields.relationship({ label: 'Mentee', collection: 'members' }), { label: 'SE Mentees', itemLabel: props => props.value || 'Mentee' }),
        }, { label: 'Contributors' }),
        year: fields.date({ label: 'Year' }),
        links: fields.array(fields.url({ label: 'Link' }), { label: 'Links', itemLabel: props => props.value || 'Link' }),
      },
    }),
    members: collection({
      label: 'Members',
      slugField: 'name',
      path: 'content/data/members/*',
      format: 'json',
      schema: {
        key: fields.number({ label: 'ID (Key)', description: 'Unique integer ID for the member' }),
        sapId: fields.number({ label: 'SAP ID' }),
        name: fields.slug({ name: { label: 'Name' } }),
        email: fields.text({ label: 'Email' }),
        profile_pic: fields.image({
          label: 'Profile Picture',
          directory: 'public/images/profile',
          publicPath: '/images/profile/',
        }),
        desc: fields.text({ label: 'Description', multiline: true }),
        GitHub: fields.text({ label: 'GitHub URL' }),
        LinkedIn: fields.text({ label: 'LinkedIn URL' }),
        location: fields.text({ label: 'Location' }),
        company: fields.text({ label: 'Company' }),
        profile_pic_2: fields.image({
          label: 'Alternative Profile Picture',
          directory: 'public/images/profile',
          publicPath: '/images/profile/',
        }),
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'content/data/events/*',
      format: 'json',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'Slug (Legacy)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        time: fields.text({ label: 'Time' }),
        venue: fields.text({ label: 'Venue' }),
        links: fields.array(fields.url({ label: 'Link' }), { label: 'Links', itemLabel: props => props.value || 'Link' }),
        images: fields.array(
          fields.image({
            label: 'Event Image',
            directory: 'public/images/events',
            publicPath: '/images/events/',
          }),
          { label: 'Images' }
        ),
        contributors: fields.object({
          Externals: fields.array(fields.relationship({ label: 'External', collection: 'members' }), { label: 'Externals', itemLabel: props => props.value || 'External' }),
          TEmentors: fields.array(fields.relationship({ label: 'Mentor', collection: 'members' }), { label: 'TE Mentors', itemLabel: props => props.value || 'Mentor' }),
          SEmentees: fields.array(fields.relationship({ label: 'Mentee', collection: 'members' }), { label: 'SE Mentees', itemLabel: props => props.value || 'Mentee' }),
        }, { label: 'Contributors' }),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: 'Settings',
      path: 'content/data/settings',
      format: 'json',
      schema: {
        newPassword: fields.text({
          label: 'New Dashboard Password',
          description: 'Type a new password here and save. Then visit /api/keystatic/rotate-password to apply it. Leave blank to keep the current password.',
        }),
      },
    }),
  },
});
