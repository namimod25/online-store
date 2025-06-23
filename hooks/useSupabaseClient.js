/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import {AuthenticatorAssertionResponse} from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export default function useSupabaseClient() {
  const [supabase, setSupabase] = useState(null)

  useEffect(() => {
    import('@supabase/supabase-js').then(({ createClient }) => {
      setSupabase(createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ))
    })
  }, [])

  return supabase
}