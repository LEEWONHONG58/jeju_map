
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface PlacePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PlacePagination: React.FC<PlacePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const max = 5;
    if (totalPages <= max) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 0, totalPages];
    if (currentPage >= totalPages - 2) return [1, 0, ...Array.from({ length: 4 }, (_, i) => totalPages - 3 + i)];
    return [1, 0, currentPage - 1, currentPage, currentPage + 1, 0, totalPages];
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn('cursor-pointer', currentPage <= 1 ? 'opacity-50 pointer-events-none' : '')}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNumber, i) => (
          pageNumber === 0 ? (
            <PaginationItem key={`ellipsis-${i}`}><PaginationEllipsis /></PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => onPageChange(pageNumber)}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        ))}

        <PaginationItem>
          <PaginationNext
            className={cn('cursor-pointer', currentPage >= totalPages ? 'opacity-50 pointer-events-none' : '')}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PlacePagination;
