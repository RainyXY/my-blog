import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  blog_id: string;
  content: string;
  excerpt: string | null;
  createdTime: Date;
}

interface BlogPostCardProps {
  post: BlogPost;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="border border-purple-100 dark:border-purple-800/50 rounded-lg overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-500 hover:scale-[1.02] flex flex-col h-full">
      <div className="p-5 flex flex-col flex-1">
        <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">
          {formatDate(post.createdTime.toString())}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 break-words">{post.excerpt || post.content.substring(0, 150) + "..."}</p>
        <Link href={`/blog/${post.blog_id}`} className="w-full">
          <button className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 text-gray-900 dark:text-white hover:text-purple-700 dark:hover:text-purple-300">
            阅读全文
          </button>
        </Link>
      </div>
    </div>
  );
}