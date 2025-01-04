// lib/auth.ts
export async function verifyUser(email: string, password: string) {
    // Burada veritabanı sorgulama yaparak kullanıcıyı doğrulayabilirsiniz
    // Örneğin, geçici bir kullanıcı kontrolü:
    const mockUser = {
      email: 'user@example.com',
      password: 'password123',
      id: 1,
    };
  
    // Kullanıcıyı doğrulama
    if (email === mockUser.email && password === mockUser.password) {
      return mockUser; // Eğer kullanıcı doğruysa, kullanıcı bilgilerini döneriz
    }
    return null; // Kullanıcı yanlışsa, null döneriz
  }