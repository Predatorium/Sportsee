import { Form, Link, redirect, useActionData, type LoaderFunctionArgs } from "react-router";
import type { Route } from "../Home/+types/index";
import { getUserInfo, login } from "../../services/api";
import Logo from "../../components/Logo";
import "./Home.css";
import config from "~/config/config";
import { getTokenFromCookie } from "~/services/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = getTokenFromCookie(cookieHeader); // ta fonction utilitaire

  if (token) {
    // Optionnel mais recommandé : vérifier que le token est bien valide
    // (pas juste présent) en le décodant / vérifiant son expiration
    const isValid = await getUserInfo(token);
    if (isValid) {
      return redirect("/dashboard");
    }
  }

  return null; // pas de token valide → on reste sur la page d'accueil
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (config.useMocks === true) {
    try {
      if (username !== config.pseudo || password !== config.mdp){
        throw ("");
      }
      return redirect(`/dashboard`)
    }
    catch {
      return { error: "Identifiants invalides" };
    }
  }

  try {
    const { token, userId } = await login(username, password);
  
    return redirect(`/dashboard`, {
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax`,
      },
    });
  }
  catch {
    return { error: "Identifiants invalides" };
  }
}

export default function Home() {
  const actionData = useActionData<typeof action>();
  
  return (
    <div className="home">
      <div className="form-side">
        <Logo/>

        <Form method="post" className="form">
          <h1>Transformez <br /> vos stats en résultats</h1>
          <h2>Se connecter</h2>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="username" id="username" name="username" placeholder="Gérard1962" required />

          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="••••••••" required />
          
          {actionData?.error && <p className="error">{actionData.error}</p>}

          <button type="submit">Se connecter</button>

          <Link to="/" className="forgot-link">Mot de passe oublié ?</Link>
        </Form>
      </div>

      <div className="image-side">
        <img src="/images/background-home.jpg" alt="Sportsee" />
      </div>
      <p className="slogan">Analysez vos performances en un clin d’œil, suivez vos progrès et atteignez vos objectifs.</p>
    </div>
  );
}