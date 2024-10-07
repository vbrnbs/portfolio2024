import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
        name: 'iframeSrc',
        type: 'string',
        title: 'Iframe Source URL',
        description: 'Enter the URL for the iframe',
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
      description: 'Enter a description for the post',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }
          ]
        }
      ],
      validation: Rule => Rule.min(1).max(5),
    }),
  
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'highlighted',
      type: 'boolean',
    }),
    defineField({
      name: 'githubLink',
      type: 'url',
      title: 'GitHub Link',
      description: 'Enter the URL for the GitHub repository',
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Link',
      description: 'Enter the URL for the link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
