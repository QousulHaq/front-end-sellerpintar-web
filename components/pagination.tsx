'use client';

import { useEffect } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext
} from '@/components/ui/pagination'; // ganti dengan path kamu

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaginationComponent({ total, limit, onPageChange }: { total: number, limit: number, onPageChange: (page: number) => void }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1');
    const totalPages = Math.ceil(total / limit);

    const createPageLink = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        return `/?${params.toString()}`;
    };

    useEffect(() => {
        onPageChange(currentPage)
    }, [currentPage])

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => {
                            if (currentPage > 1) {
                                router.push(createPageLink(currentPage - 1));
                            }
                        }}
                        aria-disabled={currentPage === 1}
                        className='aria-disabled:cursor-not-allowed cursor-pointer'
                    />
                </PaginationItem>

                {/* Numbered Page Buttons */}
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <PaginationItem key={`page-${page}`}>
                            <Link href={createPageLink(page)} scroll={false}>
                                <PaginationLink isActive={page === currentPage}>
                                    {page}
                                </PaginationLink>
                            </Link>
                        </PaginationItem>
                    );
                })}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => {
                            if (currentPage < totalPages) {
                                router.push(createPageLink(currentPage + 1));
                            }
                        }}
                        aria-disabled={currentPage === totalPages}
                        className='aria-disabled:cursor-not-allowed cursor-pointer'
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
