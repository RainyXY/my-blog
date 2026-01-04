import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {  blogsTable } from './schema';
import { eq, and, desc } from 'drizzle-orm';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle({ client });
export const createBlog = async (userId: string, title: string, blog_id: string, content: string, excerpt?: string) => {
	try {
		const [newBlog] = await db.insert(blogsTable)
			.values({ userId, title, blog_id, content, excerpt })
			.returning();
		return newBlog;
	} catch (error) {
		console.error('error creating blog:', error);
		return null;
	}
};

export const getBlog = async (blogId: string) => {
	try {
		const blog = await db
			.select()
			.from(blogsTable)
			.where(and(eq(blogsTable.blog_id, blogId)));
		if (blog.length === 0) {
			return null;
		}
		return blog[0];
	} catch (error) {
		console.error('error getting blog:', error);
		return null;
	}
};
export const getBlogs = async () => {
	try {
		const blogs = await db.select().from(blogsTable).orderBy(desc(blogsTable.id));
		return blogs;
	} catch (error) {
		console.error('error getting blogs:', error);
		return null;
	}
};