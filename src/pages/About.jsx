import React from "react";
import { motion } from "framer-motion";
import { Users, Factory, Target, Award } from "lucide-react";

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
        <p className="max-w-2xl mx-auto mt-4 text-lg text-bajrang-textSecondary md:text-xl text-white/90">
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
          {[
            {
              icon: <Target className="w-10 h-10 text-bajrang-accent" />,
              title: "Our Mission",
              desc: "To digitize and simplify latkan manufacturing with transparency, efficiency, and trust.",
            },
            {
              icon: <Factory className="w-10 h-10 text-bajrang-secondary" />,
              title: "Our Vision",
              desc: "To be the trusted backbone for workers and families driving the handicraft industry.",
            },
            {
              icon: <Award className="w-10 h-10 text-bajrang-success" />,
              title: "Our Values",
              desc: "Integrity, craftsmanship, and innovation that respects tradition and embraces progress.",
            },
          ].map((item, idx) => (
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

      {/* Team Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-bajrang-surface">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-bajrang-brand">Our Team</h2>
          <p className="mt-2 text-bajrang-textSecondary">
            A family-run business powered by community and tradition.
          </p>
        </div>
        <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
          {[
            {
              role: "Manufacturing & Production",
              name: "Handled by Parents",
              desc: "Managing raw materials, distributing work, and ensuring quality.",
            },
            {
              role: "Sales & Marketing",
              name: "Handled by Mama (Uncle)",
              desc: "Connecting finished products to the market with trust and reputation.",
            },
          ].map((person, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="p-6 border shadow-sm bg-bajrang-surfaceAlt border-bajrang-divider rounded-2xl"
            >
              <Users className="w-8 h-8 mb-3 text-bajrang-secondary" />
              <h3 className="text-lg font-semibold text-bajrang-text">
                {person.role}
              </h3>
              <p className="font-medium text-bajrang-accent">{person.name}</p>
              <p className="mt-2 text-bajrang-textSecondary">{person.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
