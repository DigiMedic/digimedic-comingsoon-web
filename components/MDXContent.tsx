"use client"

import NextImage from "next/image"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"

import Callout from "@/components/mdx/Callout"
import Chart from "@/components/mdx/Chart"
import ProjectCard from "@/components/mdx/ProjectCard"
import { Tab, Tabs } from "@/components/mdx/Tabs"

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

export default function MDXContent({
  source,
}: {
  source: MDXRemoteSerializeResult
}) {
  return <MDXRemote {...source} components={components} />
}
