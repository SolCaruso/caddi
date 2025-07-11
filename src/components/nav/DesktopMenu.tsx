import Link from "next/link";
import { Handshake, MessageCircleQuestionMark, CookieIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const iconMap = {
  contact: <MessageCircleQuestionMark className="mr-1" />,
  terms: <Handshake className="mr-1" />,
  cookies: <CookieIcon className="mr-1" />,
};

type IconKey = keyof typeof iconMap;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="flex flex-col">
          <div className="text-sm leading-none font-medium">{title}</div>
          {children && (
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function DesktopMenu({ navLinks }: { 
  navLinks: Array<{
    label: string;
    href?: string;
    dropdown?: Array<{
      label: string;
      href: string;
      description?: string;
      featured?: boolean;
      icon?: string;
    }>;
  }>;
}) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {navLinks.map((link) => {
          if (link.dropdown) {
            // App dropdown: column layout, no icons
            if (link.label === "App") {
              return (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-2 w-[320px]">
                      {link.dropdown.map((item) => (
                        <ListItem key={item.label} href={item.href} title={item.label}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }
            // Info dropdown: column layout, each item is a row with icon and text
            if (link.label === "Info") {
              return (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-2 w-[170px]">
                      {link.dropdown.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <Link href={item.href} className="flex flex-row items-center p-2 rounded-md hover:bg-accent transition-colors">
                              {iconMap[item.icon as IconKey]}
                              <div className="flex flex-col">
                                <span className="text-sm font-medium leading-none">{item.label}</span>
                                {item.description && (
                                  <span className="text-muted-foreground text-xs leading-snug mt-0.5">{item.description}</span>
                                )}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }
            // Shop: grid layout
            return (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {link.dropdown.map((item) =>
                      item.featured ? (
                        <li className="row-span-3" key={item.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                              href={item.href}
                            >
                              <div className="mt-4 mb-2 text-lg font-medium">{item.label}</div>
                              <p className="text-muted-foreground text-sm leading-tight">{item.description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ) : (
                        <ListItem key={item.label} href={item.href} title={item.label}>
                          {item.description}
                        </ListItem>
                      )
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          } else {
            return link.href ? (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : null;
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
} 