import { getBlog } from '@/db';

export default async function Page({
  params,
}: {
  params: Promise<{ blog_id: string }>
}) {
  const { blog_id } = await params
  
  const blog = await getBlog(blog_id)
  
  if (!blog) {
    return <div>文章不存在</div>
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