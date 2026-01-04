import { getBlog } from '@/db';
import { auth } from '@clerk/nextjs/server';
import { unauthorized } from 'next/navigation';

export async function POST(req: Request) {
	const { blog_id } = await req.json();

	const { userId } = await auth();
	if (!userId) {
		return new Response(JSON.stringify({ error: unauthorized }), { status: 401 });
	}
	const blog = await getBlog(blog_id);

	return new Response(JSON.stringify(blog), { status: 200 });
}
