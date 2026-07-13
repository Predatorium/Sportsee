import { redirect } from "react-router";

export async function action() {
  return redirect("/", {
    headers: {
      "Set-Cookie": "token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
    },
  });
}

export default function Logout() {
  return null;
}