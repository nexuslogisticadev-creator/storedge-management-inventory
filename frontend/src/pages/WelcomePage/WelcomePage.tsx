import PageContainer from "../../components/containers/PageContainer/PageContainer"
import Container from "../../components/containers/Container/Container"
import Section from "../../components/containers/Section/Section"
import Footer from "../../components/containers/Footer/Footer"
import Main from "../../components/containers/Main/Main"
import Nav from "../../components/navigation/Nav/Nav"
import Title from "../../components/ui/Title/Title"
import { Link } from "@/components/ui/link"

const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Suporte", href: "#suporte" }
]

export default function WelcomePage() {
    return (
        <PageContainer>
            <Nav navLinks={navLinks} />

            <Main className="flex flex-col gap-16 px-4 py-8 lg:px-[10%]">
                <Section id="inicio" className="space-y-8 *:space-y-2">
                    <Container>
                        <Title level={1}>Seja bem-vindo</Title>
                        <p>
                            Sistema de gerenciamento de estoque para controle de
                            produtos, entradas, saídas e relatórios.
                        </p>
                    </Container>

                    <article>
                        <Title level={2}>Principais funcionalidades</Title>
                        <ul>
                            <li>Cadastro de produtos</li>
                            <li>Controle de entrada e saída</li>
                            <li>Gestão de fornecedores</li>
                            <li>Relatórios de estoque</li>
                        </ul>
                    </article>
                </Section>

                <Section id="sobre" className="space-y-8 *:space-y-2">
                    <article>
                        <Title level={2}>Sobre o sistema</Title>
                        <p>
                            Este sistema foi desenvolvido para facilitar o
                            controle de estoque, permitindo melhor organização e
                            tomada de decisões.
                        </p>
                    </article>
                </Section>

                <Section id="suporte" className="space-y-8 *:space-y-2">
                    <article>
                        <Title level={2}>Suporte</Title>
                        <p>
                            Em caso de dúvidas ou problemas, entre em contato
                            com o suporte técnico.
                        </p>
                    </article>
                </Section>
            </Main>
            <Footer className="bg-muted space-y-4 px-4 lg:px-[10%]">
                <Section className="space-y-2">
                    <Title level={2}>Contato</Title>
                    <address>
                        <p>
                            Email:{" "}
                            <a href="mailto:suporte@storedge.com">
                                suporte@storedge.com
                            </a>
                        </p>
                    </address>
                </Section>

                <Section className="space-y-2">
                    <Title level={2}>Links úteis</Title>
                    <nav>
                        <ul className="flex flex-wrap gap-2">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} variant="link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Section>

                <Section className="space-y-2">
                    <Title level={2}>StorEdge</Title>
                    <p>
                        Plataforma de gerenciamento de estoque para controle
                        eficiente de produtos, movimentações e relatórios.
                    </p>
                </Section>
                <small>
                    &copy; {new Date().getFullYear()} StorEdge. Todos os
                    direitos reservados.
                </small>
            </Footer>
        </PageContainer>
    )
}
