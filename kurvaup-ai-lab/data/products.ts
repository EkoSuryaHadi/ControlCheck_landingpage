export type Product = {
  slug: string
  name: string
  category: string
  status: 'Featured' | 'Beta' | 'Coming Soon'
  summary: string
  problem: string
  features: string[]
  users: string[]
  appUrl: string
}

export const products: Product[] = [
  {
    slug: 'controlcheck-ai',
    name: 'ControlCheck AI',
    category: 'Project Control',
    status: 'Featured',
    summary: 'AI assistant for project control validation, progress review, variance checks, and actionable project insights.',
    problem: 'Project controllers spend too much time checking fragmented schedules, progress, costs, and reporting signals manually.',
    features: ['Progress & variance checks', 'AI-assisted project review', 'Early warning insights', 'Decision-ready summaries'],
    users: ['Project Controllers', 'Project Managers', 'PMO Teams'],
    appUrl: '#'
  },
  {
    slug: 'valoris',
    name: 'Valoris',
    category: 'Cost Management',
    status: 'Beta',
    summary: 'Cost intelligence platform for EVM, forecasting, trend analysis, and management visibility.',
    problem: 'Cost data is often available but not converted into fast, reliable management signals.',
    features: ['EVM dashboard', 'Cost forecasting', 'Trend & variance analysis', 'Executive insights'],
    users: ['Cost Engineers', 'Project Control', 'Management'],
    appUrl: '#'
  },
  {
    slug: 'epc-delay-predictor',
    name: 'EPC Delay Predictor',
    category: 'Project Control',
    status: 'Beta',
    summary: 'Predict schedule delay risk and identify activities that may threaten project milestones.',
    problem: 'Traditional schedule reviews are reactive and may detect slippage after it has already affected milestones.',
    features: ['Delay risk scoring', 'Schedule trend monitoring', 'Predictive alerts', 'Risk explanation'],
    users: ['Schedulers', 'Project Controls', 'Project Managers'],
    appUrl: '#'
  },
  {
    slug: 'risk-analyst-pro',
    name: 'Risk Analyst Pro',
    category: 'Risk Management',
    status: 'Beta',
    summary: 'Structure project risks, simulate scenarios, and turn risk registers into practical actions.',
    problem: 'Risk registers frequently become static documents instead of active decision tools.',
    features: ['Risk register intelligence', 'Scenario analysis', 'EAC impact simulation', 'Action recommendations'],
    users: ['Risk Engineers', 'Project Managers', 'PMO'],
    appUrl: '#'
  },
  {
    slug: 'epc-schedule-optimizer',
    name: 'EPC Schedule Optimizer',
    category: 'Project Control',
    status: 'Beta',
    summary: 'Analyze schedule logic, critical path, and sequencing opportunities for EPC execution.',
    problem: 'Complex EPC schedules are difficult to review consistently for logic gaps and optimization opportunities.',
    features: ['Critical path analysis', 'Logic validation', 'Gantt visualization', 'Schedule optimization'],
    users: ['Schedulers', 'Planning Engineers', 'Project Controls'],
    appUrl: '#'
  },
  {
    slug: 'qaqc-intelligence',
    name: 'QA/QC Intelligence',
    category: 'QA/QC & Assurance',
    status: 'Beta',
    summary: 'Quality intelligence for NCR, inspection, vendor quality, rework risk, and project assurance.',
    problem: 'Quality data is fragmented across inspections, NCRs, vendors, and punch lists, making early intervention difficult.',
    features: ['NCR intelligence', 'Inspection analytics', 'Vendor scorecards', 'Predictive quality risk'],
    users: ['QA/QC Engineers', 'Project Assurance', 'Construction Teams'],
    appUrl: '#'
  }
]
