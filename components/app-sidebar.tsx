"use client";
import { useHasActiveSubscription } from "@/app/features/subscriptions/hooks/use-subscriptions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import {
  CreditCardIcon,
  FolderOpen,
  Key,
  LogOutIcon,
  Play,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const items = [
  {
    title: "Workflows",
    url: "/workflows",
    icon: FolderOpen,
  },
  {
    title: "Executions",
    url: "/executions",
    icon: Play,
  },
  {
    title: "Credentials",
    url: "/credentials",
    icon: Key,
  },
];

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                  <Link href={"/workflows"}>
                    <Image
                      src="/logos/logo.svg"
                      alt="logo"
                      width={20}
                      height={20}
                    />
                    <span className="font-semibold text-lg">Flow</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.url.startsWith(pathname)}
                    asChild
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={async () => {
                  await (authClient as any).checkout({
                    slug: "n8n-clone-pro",
                  });
                }}
                asChild
                className="gap-x-4 h-10 px-4"
              >
                <Link href="#">
                  <StarIcon className="size-4" />
                  <span>Upgrade to Pro</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                await (authClient as any).customer.portal();
              }}
              asChild
              className="gap-x-4 h-10 px-4"
            >
              <Link href="#">
                <CreditCardIcon className="size-4" />
                <span>Billing Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                authClient.signOut({
                  fetchOptions: { onSuccess: () => router.push("/login") },
                });
              }}
              asChild
              className="gap-x-4 h-10 px-4"
            >
              <div>
                <LogOutIcon className="size-4" />
                <span>Sign out</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
