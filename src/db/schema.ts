import {  pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const blogsTable = pgTable('blogs', {
	id: serial('id').primaryKey(),
	userId: text('user_id').notNull(),
	title: text('title').notNull(),
	blog_id: text('blog_id').unique().notNull(),
	content: text('content').notNull(),
	excerpt: text('excerpt'),
	createdTime: timestamp('create_time').defaultNow().notNull(),
})

export type BlogModel = typeof blogsTable.$inferSelect;
