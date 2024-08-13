import React from 'react'
import AddStrategy from './AddStrategy'
import AddHashTags from './AddHashTags'

const StrategyDashboard = () => {
  return (
    <div className="flex flex-wrap gap-x-4">
        <AddStrategy />
        <AddHashTags />
    </div>
  )
}

export default StrategyDashboard