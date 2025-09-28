'use client'
import React, { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { Input, Alert, List, Pagination } from 'antd'

import GenderAvatar from 'components/GenderAvatar/GenderAvatar'

import SkeletonList from './SkeletonList/SkeletonList'

import { usePersons } from './util'


const HomePage: React.FC = () => {
  const [ page, setPage ] = useState(1)
  const [ search, setSearch ] = useState('')

  const { data, error, isPending } = usePersons({
    page,
    search,
  })

  const totalRef = useRef(data?.count)
  totalRef.current = totalRef.current || data?.count

  const handleSetSearch = useCallback((value: string) => {
    totalRef.current = undefined

    if (page !== 1) {
      setPage(1)
    }

    setSearch(value)
  }, [ page ])

  return (
    <>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Search"
          value={search}
          allowClear
          onClear={() => handleSetSearch('')}
          onChange={(e) => handleSetSearch(e.target.value)}
        />
        {
          error && (
            <Alert message={error.message || 'Error'} type="error" showIcon />
          )
        }
        {
          !isPending && !data?.results?.length && (
            <Alert message="No persons found" type="info" />
          )
        }
      </div>
      {
        isPending && (
          <SkeletonList
            className="flex-1 py-4"
            page={page}
            total={totalRef.current}
          />
        )
      }
      {
        !isPending && data?.results?.length > 0 && (
          <div className="flex-1 py-4">
            <List
              itemLayout="horizontal"
              dataSource={data?.results}
              renderItem={(person) => (
                <List.Item
                  className="hover:bg-[#fafafa] -mx-8 !px-8 !py-0"
                >
                  <Link
                    className="w-full hover:text-primary py-3"
                    href={`/${person.id}`}
                  >
                    <List.Item.Meta
                      avatar={<GenderAvatar gender={person.gender} />}
                      title={person.name}
                      description={`Birth year: ${person.birth_year}`}
                    />
                  </Link>
                </List.Item>
              )}
            />
          </div>
        )
      }
      {
        (isPending || data?.count > 10) && (
          <div className="flex justify-center">
            <Pagination
              current={page}
              total={data?.count || 10}
              showSizeChanger={false}
              disabled={isPending}
              onChange={setPage}
            />
          </div>
        )
      }
    </>
  )
}


export default React.memo(HomePage)
