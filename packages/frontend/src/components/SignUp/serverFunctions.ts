"use server";

export async function signupSubmit(data: {
  email: string;
  userName: string;
  password: string;
}) {
  console.log("submitting");
  const result = await fetch(
    `${process.env.BACKEND_URL}/authentication/sign-up`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    }
  ).catch((error) => {
    console.log(error);
  });

  //@ts-ignore
  if (result.status === 201) {
    return true;
  }

  return false;
}
