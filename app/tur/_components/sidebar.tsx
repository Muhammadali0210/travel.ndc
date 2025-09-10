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

const Sidebar = () => {
    return (
        <div className="lg:col-span-1">
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-24 space-y-6"
            >
                {/* Booking Card */}
                <h2 className="text-3xl font-bold text-foreground mb-6">Registration</h2>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                    <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-foreground">$899</div>
                        <div className="text-muted-foreground">per person</div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">7 days</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Group Size:</span>
                            <span className="font-medium">2-12 people</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Language:</span>
                            <span className="font-medium">English, Uzbek, Russian</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button className="w-full cursor-pointer bg-secondary hover:bg-secondary/90 text-primary-foreground rounded-full font-semibold py-3">
                            Sotib olish
                        </Button>
                        <Dialog>
                            <form>
                                <DialogTrigger asChild>
                                    <Button className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold py-3">
                                        Buyurtma berish
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[485px] p-8">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when you&apos;re
                                            done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">Name</Label>
                                            <Input id="name-1" name="name" placeholder="Your Name" />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="username-1">Phone Number</Label>
                                            <Input id="username-1" name="phone" defaultValue="+998 " />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="textarea-1">Message</Label>
                                            <Textarea id="textarea-1" name="textarea" placeholder="Your Message..." className="resize-none" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>
                    </div>
                </div>

                {/* Contact Info */}
                {/* <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
                    <h3 className="font-bold text-foreground mb-4">
                        {locale === "en" ? "Need Help?" : locale === "uz" ? "Yordam Kerakmi?" : "Нужна Помощь?"}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        {locale === "en"
                            ? "Our travel experts are here to help you plan the perfect trip."
                            : locale === "uz"
                                ? "Bizning sayohat mutaxassislarimiz sizga mukammal sayohatni rejalashtirish uchun yordam berishga tayyor."
                                : "Наши эксперты по путешествиям готовы помочь вам спланировать идеальную поездку."}
                    </p>
                    <Button variant="outline" className="w-full rounded-full bg-transparent">
                        {locale === "en" ? "Contact Us" : locale === "uz" ? "Biz Bilan Bog'laning" : "Связаться с Нами"}
                    </Button>
                </div> */}
            </motion.div>
        </div>
    )
}

export default Sidebar