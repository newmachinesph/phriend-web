import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "@/components/landing";
import { activitySlug, findCategory, getCategories, getPhriends } from "@/lib/landing";
import { pageMeta } from "@/lib/site";

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ activity: activitySlug(c.label) }));
}

export async function generateMetadata({ params }: { params: Promise<{ activity: string }> }): Promise<Metadata> {
  const category = await findCategory((await params).activity);
  if (!category) return { title: "Not found", robots: { index: false } };
  return pageMeta({
    title: `Book a local ${category.label} pro in the Philippines`.slice(0, 60),
    description: `Book a verified local for ${category.label.toLowerCase()} by the hour. ID-checked pros, public meetups, price agreed in the chat. See who is available today.`.slice(0, 150),
    path: `/services/${activitySlug(category.label)}`,
  });
}

export default async function ActivityPage({ params }: { params: Promise<{ activity: string }> }) {
  const segment = (await params).activity;
  const [category, others] = await Promise.all([findCategory(segment), getCategories()]);
  if (!category) notFound();
  const phriends = await getPhriends({ category: category.slug });
  return <Landing category={category} phriends={phriends} path={`/services/${activitySlug(category.label)}`} others={others} />;
}
