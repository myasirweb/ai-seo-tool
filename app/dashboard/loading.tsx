import Spinner from "@/components/ui/Spinner";

export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <p className="text-sm text-gray-400">Loading...</p>
    </div>
  );
}
