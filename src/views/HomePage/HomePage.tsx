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

  const count = data?.count || 0
  const results = data?.results || []

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
          !isPending && !results?.length && (
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
        !isPending && results?.length > 0 && (
          <div className="flex-1 py-4">
            <List
              itemLayout="horizontal"
              dataSource={results}
              renderItem={(person) => {
                const { id, gender, name, birth_year } = person as ApiData.ModifiedPerson

                return (
                  <List.Item
                    className="hover:bg-[#fafafa] -mx-8 !px-8 !py-0"
                  >
                    <Link
                      className="w-full hover:text-primary py-3"
                      href={`/${id}`}
                    >
                      <List.Item.Meta
                        avatar={<GenderAvatar gender={gender} />}
                        title={name}
                        description={`Birth year: ${birth_year}`}
                      />
                    </Link>
                  </List.Item>
                )
              }}
            />
          </div>
        )
      }
      {
        (isPending || count > 10) && (
          <div className="flex justify-center">
            <Pagination
              current={page}
              total={count || 10}
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
