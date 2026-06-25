import { LucideIcon } from 'lucide-react'

interface Props {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color?: 'yellow' | 'blue' | 'green' | 'purple'
}

const colorMap = {
  yellow: 'bg-yellow-50 text-yellow-600',
  blue:   'bg-blue-50 text-blue-600',
  green:  'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
}

export default function StatsCard({ title, value, subtitle, icon: Icon, color = 'yellow' }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}
