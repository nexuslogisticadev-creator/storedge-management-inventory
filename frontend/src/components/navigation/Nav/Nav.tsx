import { FaUser, FaUserPlus } from "react-icons/fa"
import LogoStoredge from "../../../assets/logo.png"

import Container from "../../containers/Container/Container"
import Link from "../Link/Link"
import Img from "./Img/Img"


export default function Nav() {
    const linkStyles = "" // classes dos estilos do link
    
    return (
        <nav>
            <Container>
                <Img
                    className="w-14" // Ajute o quanto achar necessário
                    alt="Logo StorEdge"
                    src={LogoStoredge}
                />
                <Link
                    className={linkStyles}
                    href="#inicio"
                >
                    Início
                </Link>
                <Link
                    className={linkStyles}
                    href="#sobre"
                >
                    Sobre
                </Link>
                <Link
                    className={linkStyles}
                    href="#suporte"
                >
                    Suporte
                </Link>
            </Container>

            <Container> {/* 'className' por onde serão injetadas as classes tailwind  */}
                <Link
                    className={linkStyles}
                    href="/login"
                >
                    Login <FaUser />
                </Link>
                <Link
                    className={linkStyles}
                    href="/registro"
                >
                    Registar <FaUserPlus />
                </Link>
            </Container>
        </nav>
    )
}
