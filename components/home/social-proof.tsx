"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "TechCorp",
    avatar: "SC",
    content: "Saved us 10 hours/week on manual research. The domain filtering feature alone pays for itself.",
    rating: 5,
  },
  {
    name: "Mike Williams",
    role: "Sales Ops Manager",
    company: "StartupCo",
    content: "The accuracy is incredible. Every data point comes with a source, so we trust the results completely.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Marketing",
    company: "GrowthLabs",
    content: "We process 5,000 leads per month. Data Enrich saves us thousands compared to other solutions.",
    rating: 5,
  },
];

export function SocialProof() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-heat-4 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Data Teams Worldwide
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-xl text-black-alpha-64">
            4.9/5 from 234 reviews
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="glass-card p-8 rounded-16 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-heat-100 mb-4 opacity-50" />

                {/* Content */}
                <p className="text-body-medium text-accent-black mb-6 flex-1 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-heat-100 to-heat-80 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="font-semibold text-accent-black">
                      {testimonial.name}
                    </div>
                    <div className="text-body-small text-black-alpha-64">
                      {testimonial.role} @ {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="glass-gradient-blue p-8 rounded-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent-black mb-2">
                  98%
                </div>
                <div className="text-body-small text-black-alpha-64">
                  Customer Satisfaction
                </div>
              </div>

              <div>
                <div className="text-4xl font-bold text-accent-black mb-2">
                  2.3s
                </div>
                <div className="text-body-small text-black-alpha-64">
                  Avg Processing Time
                </div>
              </div>

              <div>
                <div className="text-4xl font-bold text-accent-black mb-2">
                  47%
                </div>
                <div className="text-body-small text-black-alpha-64">
                  Avg Cost Savings
                </div>
              </div>

              <div>
                <div className="text-4xl font-bold text-accent-black mb-2">
                  24/7
                </div>
                <div className="text-body-small text-black-alpha-64">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
