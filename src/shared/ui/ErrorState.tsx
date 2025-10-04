import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

type ErrorStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn’t load the data. Please try again.",
  className = "",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={
        "mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white/70 p-6 " +
        "shadow-sm backdrop-blur transition hover:shadow-md " +
        className
      }
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-rose-100 p-3">
          <ExclamationTriangleIcon className="h-6 w-6 text-rose-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-zinc-600">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
