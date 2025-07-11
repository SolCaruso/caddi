import React from "react";
import CaddiLogo from "@/components/logos/Caddi";
import ShoppingBag from "@/components/icons/ShoppingBag";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Nav({ className }: { className?: string }) {
  return (
    <nav className="w-full py-2 px-2">
      <div className={`flex items-center justify-between ${className}`}>
        {/* Logo */}
        <div className="flex items-center">
          <CaddiLogo className="h-14 w-auto" />
        </div>
        {/* NavigationMenu (center) */}
        <div className="flex-1 flex items-center justify-center">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            Build Your Own
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Craft your own premium hardwood divot tool by hand.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/" title="Shop All">
                      Browse the full collection of handcrafted golf tools and accessories.
                    </ListItem>
                    <ListItem href="/" title="Divot Tools">
                      Premium hardwood divot tools — expertly finished and ready to ship.
                    </ListItem>
                    <ListItem href="/" title="Custom Work">
                      Unique, one-off pieces and personalized creations made to order.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>App</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Forecaddie Golf App</div>
                          <div className="text-muted-foreground">
                            Track rounds, stats, and performance with our digital caddie.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">App Instructions</div>
                          <div className="text-muted-foreground">
                            Quick start guide and tips to get the most out of the app.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>More</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleHelpIcon />
                          Contact
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleIcon />
                          Terms of Service
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleCheckIcon />
                          Cookies Settings
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Download Button & Cart */}
        <div className="flex items-center gap-4">
          <button
            className="bg-caddi-blue text-white text-base font-semibold font-sans rounded-full px-6 py-2 hover:bg-caddi-blue/90 transition-colors cursor-pointer ease-in-out-quad duration-100"
          >
            Download App
          </button>
          <button className="transition-all cursor-pointer duration-100 group ease-in-out-quad">
            <ShoppingBag className="h-9 w-9 text-caddi-blue group-hover:text-caddi-brown transition-all duration-100 ease-in-out-quad" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
