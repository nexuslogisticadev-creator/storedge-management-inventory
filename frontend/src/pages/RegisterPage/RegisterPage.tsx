import type { RegisterPageProps } from "./RegisterPage.types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageContainer from "../../components/containers/PageContainer/PageContainer"

export default function RegisterPage({ setAuthenticated }: RegisterPageProps) {
    return (
        <PageContainer className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6 rounded-2xl border bg-background p-6 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Criar conta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Preencha os dados para começar
                    </p>
                </div>

                <form className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium"
                        >
                            Nome
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium"
                        >
                            E-mail
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Senha
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                    >
                        Criar conta
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Já tem conta?{" "}
                    <a
                        href="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Entrar
                    </a>
                </p>
            </div>
        </PageContainer>
    )
}
