import Link from 'next/link';
import { BlogPostCard } from '../components/BlogPostCard';
import { getBlogs } from '@/db';
import type { BlogModel } from '@/db/schema';

export default async function Home() {
  let blogs: BlogModel[] = [];
  let error = false;

  try {
    const fetchedBlogs = await getBlogs();
    blogs = fetchedBlogs || [];
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
    error = true;
  }

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
        {error ? (
          <div className="text-center text-gray-500">
            无法加载博客文章，请稍后重试。
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
  );
}
