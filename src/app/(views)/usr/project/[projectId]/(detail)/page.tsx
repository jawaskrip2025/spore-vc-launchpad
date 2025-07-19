
import React from 'react'
import ProjectContent from './content'
import PageContainer from '@/components/containers/page-container'

export default function ProjectDetail() {
  return (
    <PageContainer title='Project' subtitle='Review User Project' canBack>
      <ProjectContent />
    </PageContainer>
  )
}
