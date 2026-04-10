import type { LoginPageProps } from "./LoginPage.types"

import PageContainer from "../../components/containers/PageContainer/PageContainer"
import Container from "@/components/containers/Container/Container"
import Link from "@/components/navigation/Link/Link"
import Title from "@/components/ui/Title/Title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form"
import { loginUser } from "@/api/fn/auth"

import type { LoginInputs } from "@/types/LoginInputs"
import { toast } from "sonner"

export default function LoginPage({ setAuthenticated }: LoginPageProps) {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInputs>()

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success("Login realizado com sucesso!")
            setAuthenticated(true)
            console.log(data)
        },
        onError: () => {
            toast.error("Erro ao fazer login")
        }
    })

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        mutation.mutate(data)
    }

    return (
        <PageContainer className="flex min-h-screen items-center justify-center px-4">
            <Container className="bg-background w-full max-w-sm space-y-6 rounded-2xl border p-6 shadow-sm">
                <Container className="space-y-2 text-center">
                    <Title
                        level={1}
                        className="text-2xl font-semibold tracking-tight"
                    >
                        Entrar
                    </Title>

                    <p className="text-muted-foreground text-sm">
                        Acesse sua conta para continuar
                    </p>
                </Container>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <Container className="relative space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Digite seu email"
                            autoComplete="username"
                            aria-invalid={!!errors.email}
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-destructive absolute -bottom-3.5 left-0 text-sm">
                                Email é obrigatório
                            </span>
                        )}
                    </Container>

                    <Container className="relative space-y-2">
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
                            aria-invalid={!!errors.password}
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="text-destructive absolute -bottom-3.5 left-0 text-sm">
                                Senha é obrigatória
                            </span>
                        )}
                    </Container>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Não tem conta?{" "}
                    <Link
                        className="font-medium text-primary hover:underline"
                        href="/registro"
                    >
                        Criar conta
                    </Link>
                </p>
            </Container>
        </PageContainer>
    )
}
