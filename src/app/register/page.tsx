import Link from 'next/link'
import Image from 'next/image'
import { signup } from '@/app/login/actions'
import { Input } from '@/components/ui/input'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7] items-center justify-center px-4 sm:px-6 py-12">

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-[20px] border border-[#E5E5EA] shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex flex-col items-center pt-8 sm:pt-10 pb-6 sm:pb-8 px-6 sm:px-8 border-b border-[#E5E5EA]">
          <Image src="/Logo.png" alt="Logo" width={88} height={88} className="object-contain mb-4 drop-shadow-sm" priority />
          <h1 className="text-xl font-bold text-[#1C1C1E] tracking-tight">
            Buat Akun Baru
          </h1>
          <p className="text-sm text-[#8E8E93] mt-1 text-center">
            Daftar untuk mulai mengelola tugasmu
          </p>
        </div>

        {/* Form */}
        <form action={signup} className="flex flex-col px-6 sm:px-8 py-6 sm:py-8 gap-4">
          {/* Error message */}
          {params?.message && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-[10px] text-center">
              {params.message}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="mahasiswa@kampus.ac.id"
              required
              className="h-11 rounded-[10px] border-[#E5E5EA] bg-[#F2F2F7] text-[#1C1C1E] placeholder:text-[#C7C7CC] text-sm focus-visible:ring-[#007AFF] focus-visible:ring-2 focus-visible:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="min. 8 karakter"
              required
              className="h-11 rounded-[10px] border-[#E5E5EA] bg-[#F2F2F7] text-[#1C1C1E] placeholder:text-[#C7C7CC] text-sm focus-visible:ring-[#007AFF] focus-visible:ring-2 focus-visible:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-[12px] bg-[#1C1C1E] text-white text-sm font-semibold hover:bg-black active:scale-[0.98] transition-all shadow-sm"
            >
              Daftar Sekarang
            </button>
            <div className="text-center mt-2">
              <Link
                href="/login"
                className="text-sm font-medium text-[#8E8E93] hover:text-[#007AFF] transition-colors"
              >
                Sudah punya akun? <span className="text-[#007AFF]">Masuk</span>
              </Link>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}
