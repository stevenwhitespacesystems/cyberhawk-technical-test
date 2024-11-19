import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/inspections/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/inspections/reports!'
}