export async function getServerSession(cookies: string) {
  try {
    const response = await fetch("http://localhost:3001/api/auth/me", {
      headers: {
        cookie: cookies,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Erro no middleware:", error);
  }

  return null;
}
