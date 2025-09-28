import React, { useMemo, useRef } from 'react'

import s from './SkeletonList.module.scss'
import { List, Skeleton } from 'antd'


type SkeletonListProps = {
  className?: string
  page: number
  total?: number
}

const SkeletonList: React.FC<SkeletonListProps> = (props) => {
  const { className, page, total } = props

  const skeletonArray = useMemo(() => {
    const prevCount = (page - 1) * 10
    const itemsLeft = total ? Math.min(10, total - prevCount) : 10
    return itemsLeft > 0 ? new Array(itemsLeft).fill({}) : []
  }, [ page, total ])

  return (
    <div className={className}>
      <List
        itemLayout="horizontal"
        dataSource={skeletonArray}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta
              avatar={<Skeleton.Avatar size={48} active />}
              title={<Skeleton.Input className="!h-[22px]" active />}
              description={<Skeleton.Input className="!h-[22px]" active />}
            />
          </List.Item>
        )}
      />
    </div>
  )
}


export default React.memo(SkeletonList)
