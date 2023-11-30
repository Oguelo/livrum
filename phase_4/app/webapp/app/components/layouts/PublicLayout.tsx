/**
 *
 * Esse é o componente utilizado para mostrar as páginas públicas do sistema (página inicial, detalhes
 * ebook e etc)
 *
 * Além disso, ele será utilizado nas páginas do cliente (é o mesmo layout com um menu lateral)
 */

import TopBar from "../TopBar";
import PublicFooter from "../Footer";

import { theme } from "@/app/theme";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <TopBar />
            <section>{children}</section>
            <PublicFooter theme={theme} email={process.env.APP_EMAIL} company={process.env.COMPANY} />
        </div>
    );
}
