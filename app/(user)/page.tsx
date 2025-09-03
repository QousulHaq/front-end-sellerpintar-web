"use client"
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import axios from 'axios';
import AxiosInstance from '@/lib/axios';

import { useSession } from 'next-auth/react';

import Card from '@/components/card';
import HeroSection from '@/components/hero-section';
import PaginationComponent from '@/components/pagination';

import type { Articles, Category } from '@/types/data';
type PageCountTypes = {
  limit: number;
  total: number;
  page: number;
}

export default function Home() {
  const [articles, setArticles] = useState<Articles[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [pageCount, SetPageCount] = useState<PageCountTypes>({ limit: 1, total: 1, page: 1 })

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentTitleFilter = searchParams.get('title') || '';
  const currentCategory = searchParams.get('category') || 'none';

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const resArticles = await AxiosInstance.get("/articles", {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          params: {
            ...(currentTitleFilter !== '' && { title: currentTitleFilter }),
            ...(currentCategory !== 'none' && { category: currentCategory }),
            page: currentPage,
            limit: 9
          }
        })
        setArticles(resArticles.data.data)
        SetPageCount({ total: resArticles.data.total, limit: resArticles.data.limit, page: resArticles.data.page })
        setLoading(false)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || error.message)
          setLoading(false)
          return
        }
        console.error(error)
        setLoading(false)
      }
    }

    if (session?.user.accessToken) {
      fetchArticles();
    }
  }, [session?.user.accessToken, currentTitleFilter, currentCategory, currentPage]);


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const resCategories = await AxiosInstance.get("/categories", {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          params: {
            page: 1,
            limit: 25
          }
        })
        setCategories(resCategories.data.data)
        setLoading(false)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || error.message)
          setLoading(false)
          return
        }
        console.error(error)
        setLoading(false)
      }
    }
    fetchCategories();
  }, [])

  return (
    <div className="main-content">
      <HeroSection
        onFilter={({ searchString, category }) => {
          const params = new URLSearchParams(searchParams.toString());

          params.set('title', searchString);
          params.set('category', category);
          params.set('page', '1');

          router.push(`/?${params.toString()}`);
        }}
        loading={loading}
        categories={categories}
      />
      <section className="card-section pt-10 px-5 md:px-[100px] pb-[60px] md:pb-[100px] flex justify-center item-center md:block md:justify-start md:items-start">
        <div className="card-section-content space-y-6">
          <p className="cards-detail-info text-slate-600 text-base font-medium leading-6">Showing : {articles.length > 9 ? pageCount.limit : articles.length} of {pageCount.total} articles</p>
          <div className="cards-container grid md:grid-cols-3 grid-cols-1 gap-x-10 md:gap-y-[60px] gap-y-10">
            {
              !loading ? (
                articles.map((value, index) => (
                  <Link href={`/detail-content/${value.id}`} key={`card-${index}`}>
                    <Card title={value.title} content={value.content} category={value.category} createdAt={value.createdAt} imageUrl={value.imageUrl} />
                  </Link>
                ))
              ) : (
                <div className="not-found-info w-full rounded-[12px] border border-slate-200 py-6">
                  <p className="text-slate-900 text-lg font-medium leading-6 text-center">Loading...</p>
                </div>
              )
            }
            {errorMessage !== '' && <p className="error-message text-red-500 text-sm">{errorMessage}</p>}
          </div>
          {articles.length === 0 && !loading ? (
            <div className="not-found-info w-full rounded-[12px] border border-slate-200 py-6">
              <p className='text-slate-900 text-lg font-medium leading-6 text-center'>no article found</p>
            </div>
          ) : ""}
          <div className="pagination-container mt-[60px]">
            <PaginationComponent
              limit={pageCount.limit}
              total={pageCount.total}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
