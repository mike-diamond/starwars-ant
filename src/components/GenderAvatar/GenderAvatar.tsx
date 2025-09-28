import React from 'react'
import { Avatar } from 'antd'
import { ManOutlined, QuestionOutlined, WomanOutlined } from '@ant-design/icons'


type GenderAvatarProps = {
  className?: string
  gender: string
}

const GenderAvatar: React.FC<GenderAvatarProps> = (props) => {
  const { className, gender } = props

  let genderIcon = null

  if (gender === 'male') {
    genderIcon = <ManOutlined />
  }
  if (gender === 'female') {
    genderIcon = <WomanOutlined />
  }
  if (gender === 'hermaphrodite') {
    genderIcon = <QuestionOutlined />
  }

  return (
    <Avatar className={className} size={48} icon={genderIcon}>{gender}</Avatar>
  )
}


export default React.memo(GenderAvatar)
