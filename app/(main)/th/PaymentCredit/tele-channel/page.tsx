import PaymentCreditTeleChannel from "./TeleChannel"
import { Metadata } from "next"
import './page.scss'

export const metadata: Metadata = {
    title: "ช่องทางชำระเงินบัตรเครดิต | TIDLOR",
    description: "ชำระเงินบัตรเครดิต/เดบิต ผ่านช่องทางโทรศัพท์สำหรับลูกค้า",
}

export default function PaymentCreditTeleChannelPage() {
    return (
        <section id="payment-credit-tele-channel">
            <div className="content-section fullPage-92 pt-48">
                <PaymentCreditTeleChannel />
            </div>
        </section>
    )
}