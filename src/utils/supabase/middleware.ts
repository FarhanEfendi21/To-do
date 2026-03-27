import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            // PERBAIKAN: Gunakan format objek { name, value } untuk request.cookies
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set({ name, value })
            })

            supabaseResponse = NextResponse.next({
              request,
            })

            // PERBAIKAN: Gunakan format objek untuk supabaseResponse.cookies
            cookiesToSet.forEach(({ name, value, options }) => {
              supabaseResponse.cookies.set({ name, value, ...options })
            })
          },
        },
      }
    )

    // PERBAIKAN: Bungkus getUser dengan try-catch
    // Mencegah aplikasi crash (500) jika koneksi ke Supabase putus/timeout
    let user = null;
    try {
      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch (fetchError) {
      console.error('⚠️ [Middleware] Gagal mengambil sesi Supabase:', fetchError)
      // Jika error jaringan, biarkan user = null agar diarahkan ke login secara aman
    }

    const pathname = request.nextUrl.pathname
    const isAuthPage = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/register')

    // PROTEKSI HALAMAN
    // Jika belum login dan bukan di halaman login/register
    if (!user && !isAuthPage) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Jika sudah login tapi mencoba ke halaman login/register
    if (user && isAuthPage) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    return supabaseResponse

  } catch (error) {
    // Tangkapan error fatal tingkat atas agar JSON Next.js tidak rusak
    console.error('⚠️ [Middleware] Fatal Error:', error)
    return NextResponse.next({ request })
  }
}