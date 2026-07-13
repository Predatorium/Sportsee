import { Form, NavLink } from 'react-router'
import './Header.css'
import Logo from '../Logo'
import Separator from '../Separator'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Logo/>
        <nav className="nav">
          <NavLink to="/dashboard/:userId" end className="nav-link">Dashboard</NavLink>
          <NavLink to="/profile/:userId" className="nav-link">Mon profil</NavLink>
          <Separator/>
          <Form method="post" action="/logout">
            <button type="submit">Se déconnecter</button>
          </Form>
        </nav>
      </div>
    </header>
  )
}