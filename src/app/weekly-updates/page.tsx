import WeeklyUpdateDashboard from '../../components/WeeklyUpdateDashboard';

export const metadata = {
  title: 'Weekly Updates - Adam Halls Garden Center',
  description: 'Track weekly performance, sales, inventory, and business metrics for Adam Halls Garden Center',
};

export default function WeeklyUpdatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WeeklyUpdateDashboard />
      </div>
    </div>
  );
}
