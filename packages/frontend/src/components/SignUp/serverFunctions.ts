export async function signupSubmit(data: {
  email: string;
  userName: string;
  password: string;
}) {
  const result = await fetch(
    `${process.env.BACKEND_URL}/authentication/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).catch((error) => {
    console.log(error);
    return false;
  });

  if (typeof result !== "boolean") {
    if (result.status) return true;
  }

  return false;
}
