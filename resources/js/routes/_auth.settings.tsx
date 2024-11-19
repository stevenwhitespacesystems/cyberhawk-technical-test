import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/settings!'
}
