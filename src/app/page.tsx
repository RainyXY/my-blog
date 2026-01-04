'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { BlogPostCard } from '../components/BlogPostCard'
import type { BlogModel } from '@/db/schema'

export default function Home() {
  const [blogs, setBlogs] = useState<BlogModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/get-blogs')
        setBlogs(response.data || [])
      } catch (err) {
        console.error('Failed to fetch blogs:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <div className="px-4 py-8">
      <section className="mb-12">
        <div className="flex justify-center mb-8">
          <Link href="/blog/create">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white dark:from-purple-500 dark:to-purple-600 rounded-full hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.05] shadow-md">
              创建新文章
            </button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-8 text-center">最新文章</h2>
        {loading ? (
          <div className="text-center text-gray-500">
            加载中...
          </div>
        ) : error ? (
          <div className="text-center text-gray-500">
            无法加载博客文章，请稍后重试。
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500">
            暂无文章
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post: BlogModel) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}