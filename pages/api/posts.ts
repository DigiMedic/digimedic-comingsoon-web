import { NextApiRequest, NextApiResponse } from 'next'
import { getBlogPosts } from '../../lib/blog'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getBlogPosts()
  res.status(200).json(posts)
}