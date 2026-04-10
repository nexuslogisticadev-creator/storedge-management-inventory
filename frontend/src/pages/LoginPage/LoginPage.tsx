import type { LoginPageProps } from "./LoginPage.types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageContainer from "../../components/containers/PageContainer/PageContainer"

import { useForm, type SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
            <div className="bg-background w-full max-w-sm space-y-6 rounded-2xl border p-6 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Entrar
                    </h1>

                    <p className="text-muted-foreground text-sm">
                        Acesse sua conta para continuar
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <div className="relative space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Nome
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Digite seu nome"
                            autoComplete="username"
                            aria-invalid={!!errors.name}
                            {...register("name", { required: true })}
                        />
                        {errors.name && (
                            <span className="text-destructive absolute -bottom-3.5 left-0 text-sm">
                                Nome é obrigatório
                            </span>
                        )}
                    </div>

                    <div className="relative space-y-2">
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
                    </div>

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
