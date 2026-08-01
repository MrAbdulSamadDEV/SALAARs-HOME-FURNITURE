import type { FAQGroup } from "@/types";

/**
 * SALAAR'S HOME – FAQ content.
 * Edit this file to change the FAQ page copy and the question/answer groups.
 */

export const FAQ_PAGE = {
  hero: {
    eyebrow: "Good to Know",
    title: "Frequently Asked Questions",
    description: "Everything you need to know about delivery, custom orders, payment and warranty.",
  },
  stillHaveQuestion: {
    title: "Still have a question?",
    description: "Call us on {phone} – we usually reply within minutes.",
    call: "Call {phone}",
    contactPage: "Contact Page",
  },
};

export const FAQ_GROUPS: FAQGroup[] = [
  {
    title: "Delivery Information",
    items: [
      {
        question: "Do you deliver furniture to my area?",
        answer:
          "Yes – we deliver nationwide with careful transport and professional assembly. Call us and we will confirm the delivery options and fee for your location.",
      },
      {
        question: "How is my furniture delivered?",
        answer:
          "Your furniture is wrapped and protected during transport, then moved into your home and assembled by our team. You do not have to lift a finger.",
      },
      {
        question: "How much does delivery cost?",
        answer:
          "The delivery fee depends on the distance and the size of the order. We always confirm the exact fee before you place your order – no surprises.",
      },
    ],
  },
  {
    title: "Custom Furniture",
    items: [
      {
        question: "Can I order a custom size or finish?",
        answer:
          "Absolutely. We regularly make custom pieces – different sizes, wood finishes, colors and materials. Share your measurements or a reference photo with us and we will quote you.",
      },
      {
        question: "How do I order a custom piece?",
        answer:
          "Simply call us or visit the showroom with your requirements (measurements, style, finish). We will confirm the design, materials and price before we start.",
      },
      {
        question: "How long does a custom piece take?",
        answer:
          "Custom furniture usually takes 7–20 days depending on the complexity of the design and our current production schedule.",
      },
    ],
  },
  {
    title: "Payment Methods",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept cash and bank transfer. For custom-made and order-made items, a small deposit secures your order and the balance is paid upon delivery.",
      },
      {
        question: "Do I need to pay the full amount in advance?",
        answer:
          "No. For in-stock items you can pay on delivery. For made-to-order pieces we ask for a small deposit, with the balance due when your furniture arrives.",
      },
      {
        question: "Do you offer installments?",
        answer:
          "We can discuss flexible payment arrangements when you call – we will find a solution that works for you.",
      },
    ],
  },
  {
    title: "Contact Information",
    items: [
      {
        question: "How can I reach SALAAR's HOME?",
        answer:
          "The fastest way is a phone call at 037 080 4453. You can also message us on Facebook or TikTok – links are in the footer.",
      },
      {
        question: "What are your opening hours?",
        answer:
          "We are open every day from 8:00 AM to 9:00 PM. You are welcome to visit the showroom anytime during these hours.",
      },
      {
        question: "Can I visit the showroom?",
        answer:
          "Of course – we love showing our furniture in person. Visit us during opening hours, and for a smoother experience call us before you come.",
      },
    ],
  },
  {
    title: "Delivery Time",
    items: [
      {
        question: "How long until I receive my furniture?",
        answer:
          "In-stock pieces are typically delivered within 1–3 days. Made-to-order and custom pieces take around 7–20 days, depending on the design.",
      },
      {
        question: "Can I choose a delivery date?",
        answer:
          "Yes – when you place your order we will agree on a delivery day and time that suits you.",
      },
    ],
  },
  {
    title: "Warranty",
    items: [
      {
        question: "Does my furniture come with a warranty?",
        answer:
          "Yes. Our furniture is covered by a structural warranty, and our team stands behind the quality of every piece we sell.",
      },
      {
        question: "What does the warranty cover?",
        answer:
          "Manufacturing defects in the frame and structure are covered. If anything is wrong with the workmanship, we will repair or replace it free of charge.",
      },
      {
        question: "What about after-sales care?",
        answer:
          "We remain available after your purchase – for care advice, small repairs or guidance on keeping your wood furniture beautiful for years.",
      },
    ],
  },
];
