import { TemplateDefaultPortfolio, OrganismHeader, OrganismFooter } from '@repo/ui-react'
import { FeatureTelegraphDashboard } from '@/src/features/FeatureTelegraphDashboard'

export default function Home() {
  return (
    <TemplateDefaultPortfolio
      header={<OrganismHeader branding={'Learn Morse Code'} />}
      footer={<OrganismFooter />}
    >
      {/* Hero Intro Matrix */}
      <main className="flex w-full flex-1 flex-col items-center justify-start px-8 text-center">
        <div className="mb-8 flex flex-col items-center space-y-2">
          <h1 className="text-foreground font-display mt-4 text-2xl font-black">Interactive </h1>
        </div>

        {/* Isolated Client State Interactive Telemetry Block */}
        <FeatureTelegraphDashboard />
      </main>
    </TemplateDefaultPortfolio>
  )
}
