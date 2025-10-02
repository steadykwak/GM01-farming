import type { ROUTE_PATH } from "@/routes/types";
import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface CButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode: "primary" | "outline" | "link" | "default";
  to?: ROUTE_PATH;
}

export const CButton = ({
  mode = "default",
  className,
  children,
  to,
  ...attributes
}: CButtonProps) => {
  switch (mode) {
    case "primary":
      return (
        <button className={clsx("primary", className)} {...attributes}>
          {children}
        </button>
      );
    case "outline":
      return;
    case "link":
      if (!to)
        throw new Error("ButtonError: to prop is required for link mode");
      return (
        <Link to={to} className={clsx("link", className)}>
          {children}
        </Link>
      );
    default:
      return (
        <button className={className} {...attributes}>
          {children}
        </button>
      );
  }
};
