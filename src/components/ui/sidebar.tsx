
import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isMobile } = useIsMobile();
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col h-screen",
        isMobile ? "w-full" : "w-64 border-r",
        className
      )}
      {...props}
    />
  );
});

Sidebar.displayName = "Sidebar";

const SidebarSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-4", className)}
    {...props}
  />
));

SidebarSection.displayName = "SidebarSection";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-2 border-b", className)}
    {...props}
  />
));

SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-2 border-t mt-auto", className)}
    {...props}
  />
));

SidebarFooter.displayName = "SidebarFooter";

const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    collapsed?: boolean;
  }
>(({ className, collapsed = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1 px-2",
        collapsed ? "items-center" : "",
        className
      )}
      {...props}
    />
  );
});

SidebarNav.displayName = "SidebarNav";

const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean;
    collapsed?: boolean;
  }
>(({ className, children, active = false, collapsed = false, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
      active ? "bg-accent" : "transparent",
      collapsed ? "justify-center" : "",
      className
    )}
    {...props}
  >
    {children}
  </a>
));

SidebarNavItem.displayName = "SidebarNavItem";

const SidebarCollapsed = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isMobile, orientation, isPortrait, isLandscape } = useIsMobile();
  
  // Fixed: Now returning a boolean value
  const isCollapsedByDefault = isMobile && isLandscape;
  
  const [isOpen, setIsOpen] = React.useState(!isCollapsedByDefault);

  return (
    <div
      ref={ref}
      className={cn(
        "lg:w-64 border-r",
        isOpen ? "w-64" : "w-16",
        "transition-width duration-200 ease-in-out",
        className
      )}
      {...props}
    />
  );
});

SidebarCollapsed.displayName = "SidebarCollapsed";

export {
  Sidebar,
  SidebarSection,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarCollapsed
}
