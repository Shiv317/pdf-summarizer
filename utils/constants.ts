import { isDev } from "@/utils/helpers";

export const pricingPlans = [
    {
        id: "basic",
        name: "Basic",
        price: 9.99,
        description: "For individuals and small teams",
        items: [
            "10 PDF uploads",
            "Basic processing",
            "Email support",
            "PDF Export",
        ],
        paymentLink: isDev ? 'https://buy.stripe.com/test_aFafZh1xb4eSbJJ05k7bW00': 'https://buy.stripe.com/bJe8wO8qQ60WdMJdnN9oc01',
        priceId: isDev ? "price_1RlYrtFtYF2CBkIYFI8l4Ewy" : "price_1RltIHCG9IYRJKc5FwIrUb3k",
    },
    {
        id: "pro",
        name: "Pro",
        price: 19.99,
        description: "For professionals and  teams",
        items: [
            "Unlimited PDF uploads",
            "Priority processing",
            "24/7 support",
            "Markdown Export",
        ],
        paymentLink: isDev ? 'https://buy.stripe.com/test_9B628r4Jn7r4bJJ19o7bW01': 'https://buy.stripe.com/28E28qcH6gFA9wtbfF9oc00',
        priceId: isDev ? "price_1RlYrtFtYF2CBkIYfVOApxhk" : "price_1RltJpCG9IYRJKc5NtZ8fYQm",
    },
];

export const containerVariants = {
    hidden: { opacity: 0, 
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    },
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}