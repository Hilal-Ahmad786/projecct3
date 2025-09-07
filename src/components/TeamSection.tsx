// src/components/TeamSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

type Member = {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  initial: string;
};

const members: Member[] = [
  {
    name: 'Hilal Ahmad',
    title: 'Founder & Lead Developer',
    bio: 'Full-stack developer with expertise in modern web technologies and AI solutions.',
    skills: ['React/Next.js', 'Python', 'AI/ML', 'System Architecture'],
    initial: 'H',
  },
  {
    name: 'Arslan Shahab',
    title: 'Full Stack Developer',
    bio: 'Specialized in MERN stack development and modern JavaScript frameworks.',
    skills: ['MERN Stack', 'Node.js', 'Database Design', 'API Development'],
    initial: 'A',
  },
  {
    name: 'Mehmet Ertem',
    title: 'Technical Advisor',
    bio: 'University professor and technology strategist with extensive research background.',
    skills: ['Technology Strategy', 'Research', 'Innovation', 'Mentorship'],
    initial: 'M',
  },
];

export default function TeamSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute bottom-20 right-20 w-20 h-20 opacity-[0.02]">
        <div 
          className="w-full h-full border border-gray-900"
          style={{ clipPath: 'circle(45% at 30% 70%)' }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Our Team"
          title="Meet the Experts"
          subtitle="A dedicated team of professionals committed to delivering exceptional digital solutions and driving innovation."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="card group text-center"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gray-100 border border-gray-200 rounded-sm mx-auto flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                  <span className="text-2xl font-medium text-gray-700">
                    {member.initial}
                  </span>
                </div>
                {/* Accent dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full opacity-60" />
              </div>

              {/* Info */}
              <h3 className="text-title text-gray-900 mb-2">
                {member.name}
              </h3>
              
              <p className="text-caption text-gray-500 uppercase tracking-wide mb-4">
                {member.title}
              </p>
              
              <p className="text-body text-gray-600 mb-6 leading-relaxed">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="space-y-2">
                <p className="text-caption text-gray-500 uppercase tracking-wide">
                  Expertise
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-sm text-xs text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            Join Our Team
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            We're always looking for talented individuals who share our passion 
            for technology and innovation.
          </p>
          <a
            href="/careers"
            className="btn btn-secondary"
          >
            View Open Positions
          </a>
        </motion.div>
      </div>
    </section>
  );
}