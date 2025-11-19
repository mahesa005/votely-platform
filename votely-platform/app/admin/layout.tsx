import { Navbar } from '@/components/navbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isAdmin={true} />
      <main className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
