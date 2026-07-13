import Logo from '../Logo'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
        <p>©Sportsee Tous droits réservés</p>
        <div className="footer-right">
            <p>Conditions générales</p>
            <p>Contact</p>
            <Logo />
        </div>
    </footer>
  )
}