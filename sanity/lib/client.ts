import { createClient } from 'next-sanity'

import { dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-09-01',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.NEXT_SANITY_API_TOKEN,
})
