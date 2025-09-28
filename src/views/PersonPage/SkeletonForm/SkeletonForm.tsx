import React from 'react'
import { Skeleton } from 'antd'


const skeletonArray = new Array(8).fill(null)

type SkeletonFormProps = {
  className?: string
}

const SkeletonForm: React.FC<SkeletonFormProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      {
        skeletonArray.map((_, index) => (
          <div
            key={index}
            className="flex justify-between border-t border-gray-200 py-5 gap-4"
          >
            <div className="w-30 flex items-center">
              <Skeleton.Input active size="small" />
            </div>
            <div className="flex flex-1">
              <Skeleton.Button block active size="default" />
            </div>
          </div>
        ))
      }
    </div>
  )
}


export default React.memo(SkeletonForm)
