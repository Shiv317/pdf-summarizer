import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MotionDiv, MotionH1, MotionH2 } from "@/components/common/motion-wrapper"
import { Variants } from "motion/react"

export default function HeroSection() {
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

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
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

  const badgeVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      }
    }
  }

  return (
    <section>
      <MotionDiv 
        className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all lg:px-12 max-w-7xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hover-animated badge */}
        <MotionDiv 
          className="relative group flex items-center justify-center"
          variants={badgeVariants}
        >
          {/* Hover gradient glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md" />
          
          {/* Badge */}
          <div className="relative z-10">
            <Badge
              variant="secondary"
              className="px-6 py-2 text-base font-medium bg-white rounded-full text-rose-600"
            >
              <Sparkles className="h-4 w-4 mr-2 text-rose-600" />
              Powered by AI
            </Badge>
          </div>
        </MotionDiv>

        {/* Headings and CTA */}
        <MotionH1 
          className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl max-w-3xl mt-6"
          variants={itemVariants}
        >
          Transform your PDFs into <span className="text-rose-600">concise</span> summaries with AI
        </MotionH1>

        <MotionH2 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mt-4"
          variants={itemVariants}
        >
          Upload your PDF, and let our AI summarize it for you in seconds.
        </MotionH2>

        <MotionDiv
          variants={buttonVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant={'link'} 
            className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 text-bold hover-no-underline shadow-lg transition-all duration-300"
          >
            <Link href="/upload" className="flex gap-2 items-center no-underline">
              <span>Try our PDF summarizer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  )
}