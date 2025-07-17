import Link from "next/link";
import { Card } from "@/components/ui/card";
import DeleteButton from "@/components/summaries/delete-button";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-3 mb-3">
      <FileText className="w-6 h-6 text-rose-400 mt-1 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-4 right-4 z-10">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="space-y-3">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
              {summary.summary_text}
            </p>
            <div className="flex justify-between items-center pt-2">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}