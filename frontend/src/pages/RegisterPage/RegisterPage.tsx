import type { RegisterPageProps } from "./RegisterPage.types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageContainer from "../../components/containers/PageContainer/PageContainer"

import { useForm, type SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerUser, type RegisterInputs } from "@/api/fn/auth"
import { toast } from "sonner"

export default function RegisterPage({ setAuthenticated }: RegisterPageProps) {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterInputs>()

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success("Conta criada com sucesso!")
        },
        onError: () => {
            toast.error("Erro ao criar conta")
        }
    })

    const onSubmit: SubmitHandler<RegisterInputs> = (data) => console.log(data)

    return (
        <PageContainer className="flex min-h-screen items-center justify-center px-4">
            <div className="bg-background w-full max-w-sm space-y-6 rounded-2xl border p-6 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Criar conta
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Preencha os dados para começar
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
                            placeholder="Seu nome"
                            autoComplete="name"
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
                        <label htmlFor="email" className="text-sm font-medium">
                            E-mail
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-destructive absolute -bottom-3.5 left-0 text-sm">
                                E-mail é obrigatório
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
                            autoComplete="new-password"
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending
                            ? "Criando conta..."
                            : "Criar conta"}
                    </Button>
                </form>

                <p className="text-muted-foreground text-center text-sm">
                    Já tem conta?{" "}
                    <a
                        href="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Entrar
                    </a>
                </p>
            </div>
        </PageContainer>
    )
}
