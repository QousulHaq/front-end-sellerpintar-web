'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext
} from '@/components/ui/pagination'; // ganti dengan path kamu

import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationComponent({ total, limit, amountPages, baseUrl = "/" }: { total?: number, limit?: number, amountPages?: number; baseUrl?: string }) {
    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1');
    let totalPages
    if (total && limit) {
        totalPages = Math.ceil(total / limit);
    }
    if (amountPages) {
        totalPages = amountPages;
    }

    const createPageLink = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        return `${baseUrl}?${params.toString()}`;
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageLink(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        className='aria-disabled:cursor-not-allowed cursor-pointer'
                    />
                </PaginationItem>

                {/* Numbered Page Buttons */}
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <PaginationItem key={`page-${page}`}>
                            <PaginationLink isActive={page === currentPage} href={createPageLink(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href={createPageLink(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                        className='aria-disabled:cursor-not-allowed cursor-pointer'
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
