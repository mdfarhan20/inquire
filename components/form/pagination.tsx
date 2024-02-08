"use client";

import { IoIosArrowBack as LeftArrowIcon, IoIosArrowForward as RightArrowIcon } from "react-icons/io";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { HTMLAttributes } from "react";

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  totalPages: number
}

export default function Pagination({ totalPages, ...props }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("submission")) || 1;

  const createPageURL = (pageNumber: number): string => {
    const params = new URLSearchParams(searchParams);
    params.set("submission", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  const generatePagination = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage === 1) {
      return [1, 2, 3];
    } else if (currentPage === totalPages) {
      return [currentPage - 2, currentPage - 1, currentPage];
    } else {
      return [ currentPage - 1, currentPage, currentPage + 1 ];
    }
  }

  const pagination = generatePagination();

  return (
    <div 
      { ...props }
      className={`flex gap-1 ${props.className}`}
    >
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pagination.map(page => (
        <PaginationNumber
          page={page}
          href={createPageURL(page)}
          isActive={page === currentPage}
        />
      ))}

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  )
}

interface PaginationNumberProps {
  page: number,
  href: string,
  isActive: boolean
}

function PaginationNumber({ page, href, isActive }: PaginationNumberProps) {
  const className = clsx(
    "border-1 border-secondary h-10 w-10 rounded-md hover:bg-secondary transition-colors duration-200 flex justify-center items-center",
    {
      "bg-secondary": isActive
    }
  );

  return (
    <Link 
      href={href}
      className={className}
    >
      {page}
    </Link>
  );
}

interface PaginationArrowProps {
  direction: "left" | "right",
  href: string,
  disabled: boolean
}

function PaginationArrow({ direction, href, disabled }: PaginationArrowProps) {
  const icon = direction === "left" ? (
    <LeftArrowIcon size="1.2rem" />
  ) : ( 
    <RightArrowIcon size="1.2rem" />
  );

  const className = "rounded-md hover:bg-secondary transition-colors duration-200 flex justify-center items-center h-10 w-10"

  return disabled ? (
    <div className={`${className} opacity-70`} >
      { icon }
    </div>
  ) : (
    <Link href={href} className={className}>{ icon }</Link>
  )
}