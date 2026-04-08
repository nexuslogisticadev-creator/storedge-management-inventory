import type { LoginPageProps } from "./LoginPage.types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageContainer from "../../components/containers/PageContainer/PageContainer"

export default function LoginPage({ setAuthenticated }: LoginPageProps) {
    return (
        <PageContainer className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6 rounded-2xl border bg-background p-6 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Entrar
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Acesse sua conta para continuar
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
                            placeholder="Digite seu nome"
                            autoComplete="username"
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
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                    >
                        Entrar
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Não tem conta?{" "}
                    <a
                        href="/registro"
                        className="font-medium text-primary hover:underline"
                    >
                        Criar conta
                    </a>
                </p>
            </div>
        </PageContainer>
    )
}
