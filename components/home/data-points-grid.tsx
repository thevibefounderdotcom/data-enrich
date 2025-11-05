"use client";

import { motion } from "framer-motion";
import { Building2, DollarSign, Code, Users, MapPin, Sparkles } from "lucide-react";

const categories = [
  {
    icon: Building2,
    title: "Company",
    gradient: "from-blue-500 to-cyan-500",
    fields: ["Name", "Industry", "Size", "Description", "Website"],
  },
  {
    icon: DollarSign,
    title: "Funding",
    gradient: "from-green-500 to-emerald-500",
    fields: ["Stage", "Amount", "Investors", "Valuation", "Last Round"],
  },
  {
    icon: Code,
    title: "Technology",
    gradient: "from-purple-500 to-pink-500",
    fields: ["Stack", "Tools", "Languages", "Infrastructure", "APIs"],
  },
  {
    icon: Users,
    title: "Leadership",
    gradient: "from-orange-500 to-red-500",
    fields: ["CEO", "Founders", "Executives", "Team Size", "LinkedIn"],
  },
  {
    icon: MapPin,
    title: "Location",
    gradient: "from-indigo-500 to-blue-500",
    fields: ["HQ", "Offices", "Remote", "Founded", "Timezone"],
  },
  {
    icon: Sparkles,
    title: "Custom",
    gradient: "from-yellow-500 to-amber-500",
    fields: ["AI Generated", "Any Field", "Natural Language", "Unlimited", "Flexible"],
  },
];

export function DataPointsGrid() {
  return (
    <section className="relative py-32 px-6">
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
            50+ Data Points Available
          </h2>
          <p className="text-xl text-black-alpha-64 max-w-2xl mx-auto">
            Enrich your emails with any company data you need, or use AI to generate custom fields
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="glass-card p-8 rounded-16 h-full hover:shadow-2xl transition-all duration-300">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mb-6 rounded-12 bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4">{category.title}</h3>

                  {/* Fields List */}
                  <ul className="space-y-2">
                    {category.fields.map((field) => (
                      <li
                        key={field}
                        className="flex items-center gap-2 text-body-medium text-black-alpha-80"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-heat-100" />
                        {field}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-16 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{
                    background: `linear-gradient(135deg, ${category.gradient})`
                  }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col gap-4 glass-gradient-purple p-8 rounded-16">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-heat-100" />
              <span className="text-lg font-semibold">
                Can't find what you need?
              </span>
            </div>
            <p className="text-body-medium text-black-alpha-80">
              Use natural language to generate any custom field with AI
            </p>
            <div className="glass-subtle px-4 py-2 rounded-8 text-mono-small text-black-alpha-64">
              Example: "Find the CEO's Twitter handle and company blog URL"
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
