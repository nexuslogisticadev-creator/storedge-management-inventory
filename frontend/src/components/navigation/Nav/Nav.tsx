import { FaUser, FaUserPlus } from "react-icons/fa"
import LogoStoredge from "../../../assets/logo.png"

import Container from "../../containers/Container/Container"
import { Link } from "@/components/ui/link"
import Img from "./Img/Img"

export default function Nav({
    navLinks
}: {
    navLinks: { label: string; href: string }[]
}) {
    return (
        <nav className="flex items-center justify-between gap-2 border-b px-4 lg:px-[10%] [&_div]:flex [&_div]:gap-2">
            <a href="/" className="aspect-square size-16 shrink-0 p-2">
                <Img alt="Logo StorEdge" src={LogoStoredge} />
            </a>
            <Container>
                {navLinks.map((link) => (
                    <Link key={link.label} variant="link" href={link.href}>
                        {link.label}
                    </Link>
                ))}
            </Container>

            <Container>
                <Link href="/login">
                    Login <FaUser />
                </Link>
                <Link href="/registro">
                    Criar <FaUserPlus />
                </Link>
            </Container>
        </nav>
    )
}
