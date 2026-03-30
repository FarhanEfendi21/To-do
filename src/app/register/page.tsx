import Link from 'next/link'
import Image from 'next/image'
import { signup } from '@/lib/actions/auth'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/ModeToggle'
import { ThemeImage } from '@/components/ui/ThemeImage'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex flex-col min-h-screen bg-secondary items-center justify-center px-4 sm:px-6 py-12 relative">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <ModeToggle />
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-card rounded-[20px] border border-border shadow-sm overflow-hidden">

        <div className="flex flex-col items-center pt-8 sm:pt-10 pb-6 sm:pb-8 px-6 sm:px-8 border-b border-border">
          <ThemeImage 
            lightSrc="/Logo.png" 
            darkSrc="/Logo-darkmode.png" 
            alt="Logo" 
            width={88} 
            height={88} 
            className="object-contain drop-shadow-sm" 
            priority 
          />
          <h1 className="text-[20px] font-bold text-foreground tracking-tight">
            MariMenugas
          </h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            Daftar untuk mulai mengelola tugasmu
          </p>
        </div>

        {/* Form */}
        <form action={signup} className="flex flex-col px-6 sm:px-8 py-6 sm:py-8 gap-4">
          {/* Error message */}
          {params?.message && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-[10px] text-center">
              {params.message}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              Nama
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className="h-11 rounded-[10px] border-border bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="user@gmail.com"
              required
              className="h-11 rounded-[10px] border-border bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="min. 8 karakter"
              required
              className="h-11 rounded-[10px] border-border bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-[12px] bg-foreground text-background text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
            >
              Daftar Sekarang
            </button>
            <div className="text-center mt-2">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Sudah punya akun? <span className="text-primary">Masuk</span>
              </Link>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}
