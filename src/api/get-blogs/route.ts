import { getBlogs } from '@/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
	const { userId } = await auth();
	if (userId) {
		const blogs = await getBlogs();
		return new Response(JSON.stringify(blogs), {
			status: 200,
		});
	}
	return new Response(null, { status: 200 });
}
