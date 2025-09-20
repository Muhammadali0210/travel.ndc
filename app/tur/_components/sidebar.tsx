'use client'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ITour } from "@/types"
import { useLocale } from "@/hooks/use-locale"
import { useState } from "react"
import request from "@/hooks/https-request"

const Sidebar = ({ tour }: { tour: ITour }) => {
    const { t } = useLocale()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "+998 ",
        message: "",

    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const formData = new FormData();
            formData.append("name", formData?.name);
            formData.append("phone_number", formData?.phone_number);
            formData.append("message", formData?.message);
            formData.append("product_id", tour?.id.toString() || "");
            const res = await request.post("/contacts", formData);
            alert(t.get("contact.form-success"));
            setFormData({
                name: "",
                email: "",
                phone_number: "+998 ",
                message: ""
            })
            console.log("Form submitted:", res)
            setIsOpenModal(false)
        } catch (error) {
            console.log("Error submitting form:", error)
            alert(t.get("contact.form-error"));
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="lg:col-span-1">
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-24 space-y-6"
            >
                <h2 className="text-3xl font-bold text-foreground mb-6">{t.get("tours.register")}</h2>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                    <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-foreground">{tour?.price}</div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{t.get("tours.duration")}</span>
                            <span className="font-medium">{tour?.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{t.get("tours.size")}</span>
                            <span className="font-medium">{tour?.groupsize?.slice(0, 30)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{t.get("tours.language")}</span>
                            <span className="font-medium">{tour?.language}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button className="w-full cursor-pointer bg-secondary hover:bg-secondary/90 text-primary-foreground rounded-full font-semibold py-3">
                            {t.get("tours.buy")}
                        </Button>
                        <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
                            <DialogTrigger asChild>
                                <Button className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold py-3">
                                    {t.get("tours.bron")}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[485px] p-8">
                                <DialogHeader className="sr-only">
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you&apos;re
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">{t.get("contact.form-name")}</Label>
                                            <Input id="name-1" name="name" value={formData.name}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                                required />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="username-1">{t.get("contact.phone")}</Label>
                                            <Input id="username-1" name="phone" type="text"
                                                value={formData.phone_number}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, phone_number: e.target.value }))} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="textarea-1">{t.get("contact.from-message")}</Label>
                                            <Textarea id="textarea-1" name="textarea" className="resize-none" value={formData.message}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                                                placeholder={t.get("contact.from-message-placeh")}
                                                rows={6}
                                                required />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mt-2 gap-4">
                                        <DialogClose asChild>
                                            <Button variant="outline" onClick={() => setIsOpenModal(false)}>{t.get("tours.cancel")}</Button>
                                        </DialogClose>
                                        <Button type="submit">{t.get("tours.bron")}</Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Sidebar