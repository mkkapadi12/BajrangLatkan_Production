import React from "react";
import { motion } from "framer-motion";
import { aboutData } from "@/constant";
import { ICONS } from "@/Icons/icons";

const About = () => {
  return (
    <div className="min-h-screen bg-bajrang-bg text-bajrang-text">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center text-white bg-bajrang-brand">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold md:text-6xl"
        >
          About <span className="text-bajrang-accent">Bajrang Latkan</span>
        </motion.h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-white/90">
          Blending tradition with technology to simplify <br />
          <span className="font-semibold text-bajrang-accent">
            Latkan Manufacturing
          </span>{" "}
          management.
        </p>
      </section>

      {/* Our Story */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-bajrang-surface">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold text-bajrang-brand">
            Our Story
          </h2>
          <p className="text-lg leading-relaxed text-bajrang-textSecondary">
            Bajrang Latkan is more than just a business – it’s a legacy. From
            village artisans handcrafting each latkan, to modern systems
            streamlining manufacturing, our mission is to empower workers,
            enhance quality, and bridge tradition with innovation.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-bajrang-surfaceAlt">
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
          {aboutData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-8 transition border shadow-md bg-bajrang-surface rounded-2xl border-bajrang-border hover:shadow-lg"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-bajrang-text">
                {item.title}
              </h3>
              <p className="text-bajrang-textSecondary">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It's Useful Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-bajrang-surface">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="mb-10 text-3xl font-bold text-bajrang-brand">
            How Bajrang Latkan Helps
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Workers Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 text-left transition border shadow-md bg-bajrang-surface rounded-2xl border-bajrang-border hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <ICONS.USERS className="w-10 h-10 text-bajrang-accent" />
                <h3 className="ml-3 text-xl font-semibold text-bajrang-text">
                  For Workers
                </h3>
              </div>
              <ul className="space-y-3 text-bajrang-textSecondary">
                <li>📦 Get work assignments directly online</li>
                <li>📊 Track progress and submissions easily</li>
                <li>💰 View monthly salary and payment history</li>
                <li>🤝 Transparency in work & payments</li>
              </ul>
            </motion.div>

            {/* Admin Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 text-left transition border shadow-md bg-bajrang-surface rounded-2xl border-bajrang-border hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <ICONS.SETTINGS className="w-10 h-10 text-bajrang-secondary" />
                <h3 className="ml-3 text-xl font-semibold text-bajrang-text">
                  For Admin
                </h3>
              </div>
              <ul className="space-y-3 text-bajrang-textSecondary">
                <li>📝 Assign work & manage raw material distribution</li>
                <li>✅ Verify product quality & quantity</li>
                <li>📈 Track worker performance & progress</li>
                <li>💵 Auto-calculate salaries with accuracy</li>
                <li>📑 Access detailed analytics & reports</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
