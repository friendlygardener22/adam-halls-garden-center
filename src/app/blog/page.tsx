import BlogDashboard from '../../components/BlogDashboard';

export const metadata = {
  title: 'Blog Management - Adam Halls Garden Center',
  description: 'Manage blog posts, schedules, and content calendar for Adam Halls Garden Center',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogDashboard />
    </div>
  );
}
