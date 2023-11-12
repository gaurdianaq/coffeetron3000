export async function signupSubmit(data: {
  userName: string;
  password: string;
}) {
  const result = await fetch(`http://127.0.0.1:3000/authentication/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.log(error);
    return false;
  });

  if (typeof result !== "boolean") {
    if (result.status) return true;
  }

  return false;
}
