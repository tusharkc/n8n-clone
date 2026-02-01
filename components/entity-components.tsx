import { cn } from "@/lib/utils";
import {
  AlertTriangleIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Input } from "./ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

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

export const EntitySearch = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-3.5" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-[200px] bg-background shadow-none border-border pl-8"
      />
    </div>
  );
};

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-auto pt-4">
      <PaginationContent>
        <PaginationItem>
          {page > 1 ? (
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => onPageChange(page - 1)}
            />
          ) : (
            <PaginationPrevious className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          // Simple pagination logic: show current, first, last, and neighbors
          const isFirst = p === 1;
          const isLast = p === totalPages;
          const isCurrent = p === page;
          const isNeighbor = Math.abs(p - page) <= 1;

          if (isFirst || isLast || isNeighbor) {
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={isCurrent}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (
            (p === page - 2 && page > 3) ||
            (p === page + 2 && page < totalPages - 2)
          ) {
            return (
              <PaginationItem key={p}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}

        <PaginationItem>
          {page < totalPages ? (
            <PaginationNext
              className="cursor-pointer"
              onClick={() => onPageChange(page + 1)}
            />
          ) : (
            <PaginationNext className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

type StateViewProps = {
  message?: string;
};

export const LoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2Icon className="animate-spin size-6 text-muted-foreground" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <AlertTriangleIcon className="size-6 text-destructive" />
      {message && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <Empty className="border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <PackageOpenIcon />
        </EmptyMedia>
      </EmptyHeader>

      <EmptyTitle>No Items</EmptyTitle>

      {message && <EmptyDescription>{message}</EmptyDescription>}
      <EmptyContent>
        <Button onClick={onNew}>New Item</Button>
      </EmptyContent>
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey: (item: T, index: number) => string;
  emptyView?: React.ReactNode;
  className?: string;
}

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full h-full">{emptyView}</div>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item, index) => (
        <div key={getKey(item, index)}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}

interface EntityItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  action?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export function EntityItem({
  href,
  title,
  subtitle,
  image,
  action,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving) {
      return;
    }
    if (onRemove) {
      await onRemove();
    }
  };

  return (
    <Link href={href}>
      <Card
        className={cn(
          "p-4 shadow-none hover:shadow cursor-pointer",
          isRemoving && "opacity-0 cursor-not-allowed",
          className,
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex  items-center gap-x-4">
            {image}
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>

              {!!subtitle && <CardDescription>{subtitle}</CardDescription>}
            </div>
          </div>

          {(action || onRemove) && (
            <div className="flex gap-x-4 items-center">
              {action}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <MoreHorizontalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleRemove}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
