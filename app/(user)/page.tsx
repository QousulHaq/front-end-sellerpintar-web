import Card from '@/components/card';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from '@/components/ui/input'

import { Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="main-content">
      <section className="hero-section relative bg-[url('/hero-image.jpg')] bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 bg-[rgba(37,99,235,0.86)]"></div>
        <div className="hero-containers z-10 space-y-10">
          <div className="hero-content space-y-3">
            <p className="text-white text-base font-bold leading-6">Blog genzet</p>
            <h1 className="text-white text-5xl leading-12 font-medium max-w-[730px]">The Journal : Design Resources, Interviews, and Industry News</h1>
            <h2 className="text-white text-2xl leading-8 font-normal">Your daily dose of design insights!</h2>
          </div>
          <div className="hero-filter-container bg-blue-500 rounded-2xl p-4 flex gap-2">
            <Select>
              <SelectTrigger className='bg-white w-[180px] rounded-[6px]'>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="input-icon-wrapper relative w-full">
              <Input
                id="search"
                type={"text"}
                placeholder="Search articles"
                required
                className='bg-white placeholder:text-slate-400 rounded-[6px] pl-8'
              >
              </Input>
              <Search className='size-4 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2' />
            </div>
          </div>
        </div>
      </section>
      <section className="card-section pt-10 px-[100px] pb-[100px]">
        <div className="card-section-content space-y-6">
          <p className="cards-detail-info text-slate-600 text-base font-medium leading-6">Showing : 20 of 240 articles</p>
          <div className="cards-container grid grid-cols-3 gap-x-10 gap-y-[60px] mb-[60px]">
            {
              Array.from({ length: 9 }).map((_, index) => (
                <Card key={`card-${index}`} />
              ))
            }
          </div>
          <div className="pagination-container">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </div>
  );
}
