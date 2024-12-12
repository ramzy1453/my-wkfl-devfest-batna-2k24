"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../components/ui/breadcrumb";
import { MobilesSidebar } from "./Sidebar";
import { Fragment } from "react";

export default function BreadcrumbHeader() {
  const pathname = usePathname();
  const path = pathname === "/" ? [""] : pathname.split("/");
  return (
    <div className="flex  flex-start items-center">
      <MobilesSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {path.map((path, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${path}`} className="capitalize">
                  {path === "" ? "Home" : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
