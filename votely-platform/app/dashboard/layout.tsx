import { Navbar } from '@/components/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen votely-bg">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 pb-12 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
