import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";
import { twMerge } from "tailwind-merge";

const Account = () => {
    return (
        <div
            className={twMerge(`
                bg-neutral-900
                from-emerald-800
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            `)}
        >
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Account home
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
    );
}

export default Account;
