import { cookies } from 'next/headers' // next/headers kullanarak cookie'lere erişiyoruz


export default async function Page() {
  // Sunucu tarafında cookie'yi almak için cookies fonksiyonunu kullanıyoruz
  const cookieStore = await cookies() // cookies() asenkron olduğu için await kullanıyoruz
  const sessionCookie = cookieStore.get('auth_token') // auth_token cookie'sini alıyoruz

  let userId: string | null = null

  if (sessionCookie) {
    // Burada token çözümleme veya doğrulama işlemi yapılabilir
    userId = sessionCookie.value // Cookie'nin değeri olarak userId'yi alıyoruz
  }

  return (
    <div>
      {userId ? (
        <p>Giriş yapmış kullanıcının ID&apos;si: {userId}</p>
      ) : (
        <p>Kullanıcı girişi yapılmamış.</p>
      )}
    </div>
  )
}