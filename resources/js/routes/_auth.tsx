import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout'
import { useAuthStore } from '@/state/auth-store'
import NotFound from '@/components/NotFound'

export const Route = createFileRoute('/_auth')({
  component: AuthenticatedLayout,
  
  beforeLoad: ({ location }) => {
    const user = useAuthStore.getState().user

    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },

  notFoundComponent: NotFound
})
