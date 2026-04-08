import { FaUser, FaUserPlus } from 'react-icons/fa';
import LogoStoredge from '../../../assets/logo.png';

import Container from '../../containers/Container/Container';
import Link from '../Link/Link';
import Img from './Img/Img';

export default function Nav() {
    const linkStyles = 'hover:underline '; // classes dos estilos do link

    return (
        <nav className="flex items-center justify-between gap-4 border-b px-4 lg:px-[10%] [&_div]:flex [&_div]:gap-2">
            <a href="/" className="aspect-square size-14 shrink-0">
                <Img alt="Logo StorEdge" src={LogoStoredge} />
            </a>
            <Container>
                <Link className={linkStyles} href="#inicio">
                    Início
                </Link>
                <Link className={linkStyles} href="#sobre">
                    Sobre
                </Link>
                <Link className={linkStyles} href="#suporte">
                    Suporte
                </Link>
            </Container>

            <Container>
                <Link className={linkStyles} href="/login">
                    Login <FaUser />
                </Link>
                <Link className={linkStyles} href="/registro">
                    Registar <FaUserPlus />
                </Link>
            </Container>
        </nav>
    );
}
