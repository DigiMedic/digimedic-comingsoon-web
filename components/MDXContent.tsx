'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import NextImage from 'next/image'
import Callout from '@/components/mdx/Callout'
import { Tabs, Tab } from '@/components/mdx/Tabs'
import Chart from '@/components/mdx/Chart'
import ProjectCard from '@/components/mdx/ProjectCard'

const Image = (props: any) => {
  return <NextImage {...props} />
}

const components = {
  Callout,
  Tabs,
  Tab,
  Chart,
  ProjectCard,
  Image,
}

export default function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />
}