'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSectionTranslations, useTranslations } from '@/hooks/useTranslations';
import {
    FaWhatsapp,
    FaPhone,
    FaEnvelope,
    FaGlobe,
    FaMapMarkerAlt
} from 'react-icons/fa';
import ParticleNetwork from '@/components/ParticleNetwork';
import { contactDetails, socialLinks } from '@/data/contact';

export default function ConnectPage() {
    const t = useSectionTranslations('connect');
    const { locale, setLocale } = useTranslations();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'tr', label: 'TR' },
        { code: 'de', label: 'DE' },
        { code: 'ar', label: 'AR' },
        { code: 'ur', label: 'UR' },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden flex flex-col items-center justify-center py-12 px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <ParticleNetwork className="opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950 pointer-events-none" />
                {/* Ambient Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
            </div>

            {/* Language Switcher */}
            <div className="absolute top-6 right-6 z-20 flex gap-2">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLocale(lang.code as any)}
                        className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${locale === lang.code
                                ? 'bg-white/20 text-white'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>

            <motion.div
                className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Logo & Header */}
                <motion.div variants={itemVariants} className="text-center mb-4">
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-gray-800 bg-gray-900/50 backdrop-blur-md">
                        <Image
                            src="/images/logo/PSlogo11.png"
                            alt="PakSoft Logo"
                            fill
                            className="object-contain p-2"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Primary Actions */}
                <motion.div variants={itemVariants} className="w-full space-y-3">
                    <a
                        href={`https://wa.me/${contactDetails.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                                <FaWhatsapp className="text-xl" />
                            </div>
                            <span>{t('whatsapp')}</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_10px_#25D366]" />
                    </a>

                    <a
                        href={`tel:${contactDetails.phone}`}
                        className="group flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <FaPhone className="text-xl" />
                            </div>
                            <span>{t('call')}</span>
                        </div>
                    </a>

                    <a
                        href={`mailto:${contactDetails.email}`}
                        className="group flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <FaEnvelope className="text-xl" />
                            </div>
                            <span>{t('email')}</span>
                        </div>
                    </a>

                    <a
                        href={contactDetails.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <FaMapMarkerAlt className="text-xl" />
                            </div>
                            <span>{t('location')}</span>
                        </div>
                    </a>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={itemVariants} className="w-full pt-6">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-gray-950 px-2 text-gray-500 tracking-widest">{t('socials')}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.href}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 text-gray-400 transition-all transform hover:scale-110 hover:text-white hover:shadow-lg ${social.color}`}
                                aria-label="Social Link"
                            >
                                <social.icon className="text-xl" />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Website Link */}
                <motion.div variants={itemVariants} className="pt-8 pb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                    >
                        <FaGlobe />
                        <span>{t('website')}</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
