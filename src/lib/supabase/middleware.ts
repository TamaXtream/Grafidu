import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Satpam: cek cookie session Supabase di setiap request.
// Kalau belum login dan mau ke /student, /teacher, /admin -> tendang ke /login.
// Kalau sudah login tapi salah kamar (misal student ke /admin) -> arahkan ke kamar sendiri.
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Kalau .env.local belum diisi, jangan error - lewatkan saja (mode demo lama).
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected =
    path.startsWith("/student") ||
    path.startsWith("/teacher") ||
    path.startsWith("/admin");

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Sudah login: cek role dari tabel profiles untuk cegah salah kamar.
  // Kalau tabel profiles belum ada / RLS ketat, gagal cek = lewatkan saja.
  if (user && isProtected) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = (profile as { role?: string } | null)?.role;
    if (role) {
      const wantStudent = path.startsWith("/student");
      const wantTeacher = path.startsWith("/teacher");
      const wantAdmin = path.startsWith("/admin");
      const ok =
        (role === "student" && wantStudent) ||
        (role === "teacher" && wantTeacher) ||
        (role === "admin" && wantAdmin);
      if (!ok) {
        const url = request.nextUrl.clone();
        url.pathname =
          role === "teacher"
            ? "/teacher/home"
            : role === "admin"
              ? "/admin"
              : "/student/home";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
