import "./style.css";

import TractianLogo from '../../assets/img/tractian-logo.png';

interface Props {
    className: string
}

function Header({ className }: Props) {
  return (
    <header className={`${className}`} >
        <img alt="Tractian Logo" src={TractianLogo} height={20}/>

        <nav>
            <a href="/">Home</a>
            <a href="/companies">Companies</a>
            <a href="/units">Units</a>
            <a href="/users">Users</a>
            <a href="/workorders">Workorders</a>
        </nav>
    </header>
  );
}

export default Header;
