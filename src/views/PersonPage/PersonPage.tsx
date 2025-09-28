'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { fields } from 'helpers'
import { Alert, Button, Input, Skeleton, Typography } from 'antd'
import GenderAvatar from 'components/GenderAvatar/GenderAvatar'

import SkeletonForm from './SkeletonForm/SkeletonForm'
import { useEditPerson, usePerson, usePersonId } from './util'


type PersonPageProps = {
  params: Promise<{
    person: ''
  }>
}

const PersonPage: React.FC<PersonPageProps> = (props) => {
  const { params } = props

  const { personId, isFetching } = usePersonId({ params })
  const { data, error, isPending } = usePerson(personId)
  const { values, localStorageData, save, setValues } = useEditPerson(personId)

  const errorMessage = error ? error.message || 'Error' : data?.detail

  useEffect(() => {
    if (data && !errorMessage) {
      const { url, created, edited, detail, homeworld, films, species, vehicles, starships, ...rest } = data

      setValues({
        ...rest,
        ...localStorageData,
      })
    }
  }, [ data, localStorageData, errorMessage ])

  return (
    <>
      {
        errorMessage && (
          <Alert message={errorMessage} type="error" showIcon />
        )
      }
      <div className="flex-1 flex flex-col items-center justify-end">
        {
          (isPending || isFetching) && (
            <div className="flex-1 w-full">
              <div className="flex items-center gap-4">
                <Skeleton.Avatar size={48} active />
                <Skeleton.Input active />
              </div>
              <SkeletonForm className="mt-6" />
            </div>
          )
        }
        {
          !isPending && !isFetching && !errorMessage && (
            <div className="flex-1 w-full">
              <div className="flex items-center gap-4">
                <GenderAvatar gender={localStorageData?.gender || data?.gender || ''} />
                <Typography.Title className="!mb-0" level={2}>
                  {localStorageData?.name || data?.name || ''}
                </Typography.Title>
              </div>
              <div className="mt-6">
                {
                  fields.map((field) => {
                    const value = values[field.id as keyof typeof values] || 'N/A'

                    return (
                      <div
                        key={field.id}
                        className="flex justify-between border-t border-gray-200 py-5 gap-4"
                      >
                        <div
                          className="font-medium text-gray-700 w-30 flex-none flex items-center"
                        >
                          {field.title}
                        </div>
                        <Input
                          value={value}
                          onChange={(e) => setValues({
                            ...values,
                            [field.id]: e.target.value,
                          })}
                        />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
        <div className="flex justify-center mt-6 gap-4">
          <Link href="/">
            <Button
              size="large"
            >
              Cancel
            </Button>
          </Link>
          <Link href="/">
            <Button
              size="large"
              type="primary"
              disabled={Boolean(isPending || isFetching || errorMessage)}
              onClick={save}
            >
              Save
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}


export default React.memo(PersonPage)
