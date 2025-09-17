'use client'
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ITour } from "@/types"

const Overview = ({tour}: {tour: ITour}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Tabs defaultValue="account" className="w-full">
                <TabsList>
                    <TabsTrigger value="account">Overview</TabsTrigger>
                    <TabsTrigger value="password">Map</TabsTrigger>
                    <TabsTrigger value="comment">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: tour?.desc || "" }}></p>
                </TabsContent>
                <TabsContent value="password">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Tour Map</h2>
                    <div className="w-full border border-border rounded-2xl h-[300px]" dangerouslySetInnerHTML={{ __html: tour?.map || "" }}></div>
                </TabsContent>
                <TabsContent value="comment">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Client comments</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        Bizning professional tarzda tayyorlangan sayohatimiz bilan bu ajoyib joyning sehrini his eting. Yashirin marvaridlarni kashf eting, mahalliy madaniyatga sho'ng'ing va umr bo'yi esda qoladigan xotiralar yarating.
                        Bizning professional tarzda tayyorlangan sayohatimiz bilan bu ajoyib joyning sehrini his eting. Yashirin marvaridlarni kashf eting, mahalliy madaniyatga sho'ng'ing va umr bo'yi esda qoladigan xotiralar yarating.
                        Bizning professional tarzda tayyorlangan sayohatimiz bilan bu ajoyib joyning sehrini his eting. Yashirin marvaridlarni kashf eting, mahalliy madaniyatga sho'ng'ing va umr bo'yi esda qoladigan xotiralar yarating.
                        Bizning professional tarzda tayyorlangan sayohatimiz bilan bu ajoyib joyning sehrini his eting. Yashirin marvaridlarni kashf eting, mahalliy madaniyatga sho'ng'ing va umr bo'yi esda qoladigan xotiralar yarating.
                        Bizning professional tarzda tayyorlangan sayohatimiz bilan bu ajoyib joyning sehrini his eting. Yashirin marvaridlarni kashf eting, mahalliy madaniyatga sho'ng'ing va umr bo'yi esda qoladigan xotiralar yarating.
                    </p>
                </TabsContent>
            </Tabs>
        </motion.div>
    )
}

export default Overview