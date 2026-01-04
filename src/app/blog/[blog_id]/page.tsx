'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const blog_id = params.blog_id as string
  
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const response = await axios.post('/api/get-blog', { blog_id })
        setBlog(response.data)
      } catch (err) {
        console.error('获取文章失败:', err)
        setError('获取文章失败')
      } finally {
        setLoading(false)
      }
    }
    
    if (blog_id) {
      fetchBlog()
    }
  }, [blog_id])
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>
  }
  
  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
  }
  
  if (!blog) {
    return <div className="container mx-auto px-4 py-8">文章不存在</div>
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      {blog.excerpt && <p className="text-gray-600 mb-8">{blog.excerpt}</p>}
      <div className="prose max-w-none">
        {blog.content}
      </div>
    </div>
  )
}