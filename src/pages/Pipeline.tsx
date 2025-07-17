import { DragDropPipeline } from '@/components/pipeline/DragDropPipeline'

interface Deal {
  id: string
  title: string
  company: string
  contact: string
  value: number
  probability: number
  aiScore: number
  expectedCloseDate: string
  stage: string
}

interface PipelineStage {
  id: string
  name: string
  color: string
  deals: Deal[]
}

export function Pipeline() {
  return (
    <div className="p-6">
      <DragDropPipeline />
    </div>
  )
}