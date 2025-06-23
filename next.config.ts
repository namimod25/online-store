/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@supabase/realtime-js'],
  // Optional: If using Supabase auth helpers
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig