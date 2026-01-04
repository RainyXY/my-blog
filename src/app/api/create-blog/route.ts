import { createBlog } from '@/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
	const { title, content, excerpt } = await req.json();
	const { userId } = await auth();

	if (userId) {
		// Generate a blog_id from the title (slugify)
    	const blog_id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
		//1.创建一个blog
		const newBlog = await createBlog(userId,title, blog_id, content, excerpt);
		//2.返回blog id
		return new Response(JSON.stringify({ blog_id: newBlog?.blog_id }), {
			status: 200,
		});
	}
	return new Response(null, { status: 200 });
}
