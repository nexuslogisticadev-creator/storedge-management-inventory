import type { RegisterPageProps } from './RegisterPage.types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageContainer from '../../components/containers/PageContainer/PageContainer';

export default function RegisterPage({ setAuthenticated }: RegisterPageProps) {
    return (
        <PageContainer className="mx-auto min-h-screen max-w-sm content-center space-y-8 px-4">
            <h2 className="text-title-primary text-center">Cadastro</h2>
            <form className="flex flex-col gap-4">
                <label>
                    Nome
                    <Input type="text" placeholder="Nome" />
                </label>
                <label>
                    E-mail
                    <Input type="email" placeholder="E-mail" />
                </label>
                <label>
                    Senha
                    <Input type="password" placeholder="Senha" />
                </label>
                <Button type="submit" className="w-full">
                    Cadastrar
                </Button>
            </form>
        </PageContainer>
    );
}
