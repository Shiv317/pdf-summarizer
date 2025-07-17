import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { pricingPlans } from "@/utils/constants";
import { MotionDiv, MotionH2 } from "@/components/common/motion-wrapper";
import { Variants } from "motion/react";

type PriceType = {
    id: string;
    name: string;
    price: number;
    description: string;
    items: string[];
    paymentLink: string;
    priceId: string;
}

const PricingCard = ({
    name,
    price,
    description,
    items,
    id,
    paymentLink,
    index
}: PriceType & { index: number }) => {
    const cardVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.15
            }
        }
    }

    const contentVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { 
            opacity: 0, 
            x: -10 
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const priceVariants: Variants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
            }
        }
    }

    const buttonVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4
            }
        }
    }

    return (
        <MotionDiv
            className="relative w-full max-w-lg"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
            }}
        >
            {/* Pro plan highlight glow */}
            {id === "pro" && (
                <MotionDiv
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/20 via-rose-400/20 to-rose-500/20 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            )}

            <MotionDiv
                className={cn(
                    "relative flex flex-col h-full gap-4 lg-gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl bg-white/50 backdrop-blur-sm",
                    id === "pro" && "border-rose-500 gap-5 border-2 bg-white/80"
                )}
                variants={contentVariants}
            >
                <MotionDiv 
                    className="flex justify-between items-center gap-4"
                    variants={itemVariants}
                >
                    <div>
                        <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
                        <p className="text-base-content/80 mt-2">{description}</p>
                    </div>
                </MotionDiv>

                <MotionDiv 
                    className="flex gap-2"
                    variants={priceVariants}
                >
                    <p className="text-5xl tracking-tight font-extrabold">${price}</p>
                    <div className="flex flex-col justify-end mb-[4px]">
                        <p className="text-xs uppercase font-semibold">CAD</p>
                        <p className="text-xs">/month</p>
                    </div>
                </MotionDiv>

                <MotionDiv 
                    className="space-y-2.5 leading-relaxed text-base flex-1"
                    variants={contentVariants}
                >
                    {items.map((item, idx) => (
                        <MotionDiv
                            key={idx}
                            className="flex items-center gap-2"
                            variants={itemVariants}
                        >
                            <CheckIcon size={18} className="text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                        </MotionDiv>
                    ))}
                </MotionDiv>

                <MotionDiv 
                    className="space-y-2 flex justify-center w-full"
                    variants={buttonVariants}
                >
                    <Link
                        href={paymentLink}
                        className={cn(
                            "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2 transition-all duration-300",
                            id === "pro"
                                ? "border-rose-900 shadow-lg shadow-rose-500/25"
                                : "border-rose-100 from-rose-400 to-rose-500"
                        )}
                    >
                        Buy Now <ArrowRight size={18} />
                    </Link>
                </MotionDiv>
            </MotionDiv>
        </MotionDiv>
    );
};

export default function PricingSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    }

    const headerVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 30 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const cardsContainerVariants: Variants  = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    }

    return (
        <section>
            <MotionDiv 
                className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <MotionDiv 
                    className="text-center mb-16"
                    variants={headerVariants}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Pricing
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose the perfect plan for your PDF summarization needs
                    </p>
                </MotionDiv>

                <MotionDiv 
                    className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"
                    variants={cardsContainerVariants}
                >
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={plan.id} {...plan} index={index} />
                    ))}
                </MotionDiv>
            </MotionDiv>
        </section>
    );
}