import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

function EntityHeader({
  title,
  description,
  newButtonLabel,
  onNew,
  newButtonHref,
  disabled,
  isCreating,
}: EntityHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {newButtonHref ? (
        <Link
          prefetch
          href={newButtonHref}
          className={buttonVariants({
            variant: disabled ? "outline" : "default",
            size: "sm",
          })}
        >
          {newButtonLabel}
        </Link>
      ) : (
        <Button onClick={onNew} disabled={disabled || isCreating} size="sm">
          <PlusIcon />
          {isCreating ? "Creating..." : newButtonLabel}
        </Button>
      )}
    </div>
  );
}

export default EntityHeader;

export const EntityContainer = ({
  header,
  search,
  pagination,
  children,
}: {
  header: React.ReactNode;
  search: React.ReactNode;
  pagination: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-8 h-full">
        {header}
        {search}
        {children}
      </div>
      {pagination}
    </div>
  );
};
