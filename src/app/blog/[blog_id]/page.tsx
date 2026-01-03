export default async function Page({
  params,
}: {
  params: Promise<{ blog_id: string }>
}) {
  const { blog_id } = await params
  return <div>My Post: {blog_id}</div>
}