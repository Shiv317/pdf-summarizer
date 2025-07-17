import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { MotionDiv, MotionH2, MotionH3 } from "@/components/common/motion-wrapper";
import { Variants } from "motion/react";

type Steps = {
    icon: React.ReactNode;
    label: string;
    description: string;
}

const steps: Steps[] = [
    {
        icon: <FileText size={64} strokeWidth={1.5} />,
        label: "Upload your PDF",
        description: "Simply drag and drop your PDF file into the upload area or click to select it from your device.",
    },{
        icon: <BrainCircuit size={64} strokeWidth={1.5} />,
        label: "AI analysis",
        description: "Our advanced AI model analyzes the PDF content and extracts the most important information.",
    }, {
        icon: <FileOutput size={64} strokeWidth={1.5} />,
        label: "Get your summary",
        description: "Receive a clear, concise summary of your PDF content in a matter of seconds.",
    }
]

export default function HowItWorksSection() {
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

    const gridVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.4
            }
        }
    }

    const stepVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const arrowVariants: Variants = {
        hidden: { 
            opacity: 0, 
            x: -20,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3
            }
        }
    }

    return (
        <section className="relative overflow-hidden bg-gray-50">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                <MotionDiv 
                    className="text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <MotionH2 
                        className="font-bold text-xl uppercase mb-4 text-rose-500"
                        variants={headerVariants}
                    >
                        How it works
                    </MotionH2>
                    <MotionH3 
                        className="font-bold text-3xl max-w-2xl mx-auto"
                        variants={headerVariants}
                    >
                        Our PDF summarizer uses advanced AI to quickly and accurately
                        extract the most important information from your PDF files.
                    </MotionH3>
                </MotionDiv>

                <MotionDiv 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {steps.map((step, idx) => (
                        <div className="relative flex items-stretch" key={idx}>
                            <StepItem {...step} index={idx} />
                            {idx < steps.length - 1 && (
                                <MotionDiv 
                                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                                    variants={arrowVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <MoveRight size={32} strokeWidth={1} className="text-rose-400" />
                                </MotionDiv>
                            )}
                        </div>
                    ))}
                </MotionDiv>
            </div>
        </section>
    );
}

function StepItem({icon, label, description, index}: Steps & {index: number}) {
    const cardVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1
            }
        }
    }

    const iconVariants: Variants = {
        hidden: { 
            opacity: 0, 
            scale: 0.5,
            rotate: -10
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
            }
        }
    }

    const contentVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 20 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3
            }
        }
    }

    return (
        <MotionDiv 
            className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors group w-full"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
            }}
        >
            <div className="flex flex-col gap-4 h-full">
                <MotionDiv 
                    className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors"
                    variants={iconVariants}
                >
                    <div className="text-rose-500">{icon}</div>
                </MotionDiv>
                <MotionDiv 
                    className="flex flex-col flex-1 gap-1 justify-between"
                    variants={contentVariants}
                >
                    <h4 className="text-center font-bold text-xl">{label}</h4>
                    <p className="text-center text-gray-600 text-sm">{description}</p>
                </MotionDiv>
            </div>
        </MotionDiv>
    );
}