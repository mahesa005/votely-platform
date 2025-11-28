import { Navbar } from '@/components/navbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen votely-bg">
      <Navbar isAdmin={true} />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-24 pb-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
