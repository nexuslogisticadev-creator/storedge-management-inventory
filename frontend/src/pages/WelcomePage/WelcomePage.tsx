import PageContainer from "../../components/containers/PageContainer/PageContainer"
import Container from "../../components/containers/Container/Container"
import Section from "../../components/containers/Section/Section"
import Footer from "../../components/containers/Footer/Footer"
import Main from "../../components/containers/Main/Main"
import Nav from "../../components/navigation/Nav/Nav"
import Title from "../../components/ui/Title/Title"
import { Link } from "@/components/ui/link"
import {
    FaBox,
    FaExchangeAlt,
    FaHandshake,
    FaChartBar,
    FaBolt,
    FaCheckCircle
} from "react-icons/fa"

const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Suporte", href: "#suporte" }
]

const features = [
    {
        icon: FaBox,
        color: "from-blue-500/20 to-cyan-500/20",
        title: "Cadastro de produtos",
        desc: "Organize itens com categorias, variações e detalhes completos"
    },
    {
        icon: FaExchangeAlt,
        color: "from-purple-500/20 to-pink-500/20",
        title: "Entradas e saídas",
        desc: "Acompanhe movimentações com histórico claro"
    },
    {
        icon: FaHandshake,
        color: "from-green-500/20 to-emerald-500/20",
        title: "Fornecedores",
        desc: "Centralize contatos e relações comerciais"
    },
    {
        icon: FaChartBar,
        color: "from-orange-500/20 to-yellow-500/20",
        title: "Relatórios",
        desc: "Tenha visão estratégica do seu estoque"
    }
]

export default function WelcomePage() {
    return (
        <PageContainer>
            <div className="bg-background/70 sticky top-0 z-50 border-b backdrop-blur-xl">
                <Nav navLinks={navLinks} />
            </div>

            <Main className="mx-auto flex max-w-6xl flex-col gap-32 px-4 py-20">
                <Section
                    id="inicio"
                    className="relative flex flex-col items-center gap-10 text-center"
                >
                    <div className="absolute -z-10 h-80 w-80 rounded-full bg-linear-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl" />

                    <Title
                        level={1}
                        className="text-4xl leading-tight font-bold lg:text-6xl"
                    >
                        Controle de estoque
                        <span className="from-primary block bg-linear-to-r to-purple-500 bg-clip-text text-transparent">
                            simples e poderoso
                        </span>
                    </Title>

                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Gerencie produtos, movimentações e relatórios em uma
                        plataforma moderna, rápida e intuitiva.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="#sobre"
                            variant="default"
                            className="px-6 py-2 transition hover:scale-105"
                        >
                            Começar
                        </Link>
                        <Link
                            href="#suporte"
                            variant="outline"
                            className="px-6 py-2 transition hover:scale-105"
                        >
                            Suporte
                        </Link>
                    </div>

                    <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-6 text-xs">
                        <span className="flex items-center gap-2">
                            <FaCheckCircle /> Simples
                        </span>
                        <span className="flex items-center gap-2">
                            <FaBolt /> Rápido
                        </span>
                        <span className="flex items-center gap-2">
                            <FaChartBar /> Escalável
                        </span>
                    </div>
                </Section>

                <Section id="features" className="space-y-14">
                    <Title
                        level={2}
                        className="text-center text-3xl font-semibold"
                    >
                        Funcionalidades
                    </Title>

                    <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map(({ icon: Icon, title, desc, color }) => (
                            <div
                                key={title}
                                className="group bg-card relative overflow-hidden rounded-2xl border p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div
                                    className={`absolute inset-0 bg-linear-to-br opacity-0 transition group-hover:opacity-100 ${color}`}
                                />

                                <div className="relative">
                                    <div className="bg-background mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-lg shadow-sm">
                                        <Icon />
                                    </div>

                                    <h3 className="mb-2 font-semibold">
                                        {title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Container>
                </Section>

                <Section id="sobre" className="space-y-8 text-center">
                    <Title level={2} className="text-3xl font-semibold">
                        Sobre o sistema
                    </Title>

                    <p className="text-muted-foreground mx-auto max-w-3xl">
                        O StorEdge foi criado para simplificar a gestão de
                        estoque, oferecendo clareza nas movimentações e ajudando
                        na tomada de decisões com dados confiáveis.
                    </p>

                    <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
                        {["Organização", "Produtividade", "Controle"].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="bg-card rounded-xl border p-5 text-sm font-medium shadow-sm transition hover:scale-105 hover:shadow-md"
                                >
                                    {item}
                                </div>
                            )
                        )}
                    </div>
                </Section>

                <Section id="suporte" className="space-y-6 text-center">
                    <Title level={2} className="text-3xl font-semibold">
                        Precisa de ajuda?
                    </Title>

                    <p className="text-muted-foreground">
                        Fale com nosso suporte e resolva rapidamente qualquer
                        problema.
                    </p>

                    <Link
                        href="mailto:suporte@storedge.com"
                        variant="default"
                        className="px-6 py-2 transition hover:scale-105"
                    >
                        suporte@storedge.com
                    </Link>
                </Section>
            </Main>

            <Footer className="bg-gray-200 mt-24 border-t">
                <Container className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
                    <Section className="space-y-3">
                        <Title level={3}>Contato</Title>
                        <address className="text-muted-foreground text-sm not-italic">
                            suporte@storedge.com
                        </address>
                    </Section>

                    <Section className="space-y-3">
                        <Title level={3}>Navegação</Title>
                        <ul className="space-y-2 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} variant="link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section className="space-y-3">
                        <Title level={3}>StorEdge</Title>
                        <p className="text-muted-foreground text-sm">
                            Sistema moderno de gestão de estoque focado em
                            simplicidade e eficiência.
                        </p>
                    </Section>
                </Container>

                <div className="text-muted-foreground border-t py-4 text-center text-xs">
                    © {new Date().getFullYear()} StorEdge. Todos os direitos
                    reservados.
                </div>
            </Footer>
        </PageContainer>
    )
}
