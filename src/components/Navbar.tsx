'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  XMarkIcon,
  Bars3Icon,
  GlobeAltIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  ShoppingCartIcon,
  LinkIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  BoltIcon,
  PencilSquareIcon,
  UserGroupIcon,
  BookOpenIcon,
  CommandLineIcon,
  CloudIcon,
  RocketLaunchIcon,
  MegaphoneIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  CursorArrowRaysIcon,
  ShareIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  PlayIcon,
  BriefcaseIcon,
  CloudArrowUpIcon,
  GlobeEuropeAfricaIcon,
  SwatchIcon,
  ServerStackIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
  AdjustmentsHorizontalIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  PhotoIcon,
  CubeTransparentIcon,
  ArrowPathIcon,
  LockClosedIcon,
  SignalIcon,
  CubeIcon,
  TagIcon,
  NewspaperIcon,
  FilmIcon,
  HandThumbUpIcon,
  InboxStackIcon,
  BeakerIcon,
  RectangleGroupIcon,
  // New icons for expanded hierarchy
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  SparklesIcon,
  LightBulbIcon,
  ScaleIcon,
  FireIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  FunnelIcon,
  Cog6ToothIcon,
  ArrowsRightLeftIcon,
  TableCellsIcon,
  UsersIcon,
  ViewfinderCircleIcon,
  Squares2X2Icon,
  HashtagIcon,
  WrenchIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import { getLocalizedPath, localizeFullPath, delocalizePath } from '@/lib/routes';
import LocalizedLink from '@/components/LocalizedLink';
import Image from "next/image";
import { trackQuoteRequest, trackLanguageChange } from '@/lib/analytics';

// Service icon components mapping
const serviceIcons: Record<string, React.ElementType> = {
  // ── webSoftware ──
  'web-development': CodeBracketIcon,
  'frontend-development': ComputerDesktopIcon,
  'backend-development': ServerStackIcon,
  'full-stack-development': CodeBracketIcon,
  'progressive-web-apps': RocketLaunchIcon,
  'headless-cms-development': CubeIcon,
  'jamstack-development': BoltIcon,
  'e-commerce': ShoppingCartIcon,
  'shopify-development': ShoppingCartIcon,
  'woocommerce-development': ShoppingCartIcon,
  'magento-development': ShoppingCartIcon,
  'custom-ecommerce': ShoppingCartIcon,
  'marketplace-development': TagIcon,
  'b2b-ecommerce': CurrencyDollarIcon,
  'mobile-development': DevicePhoneMobileIcon,
  'ios-development': DevicePhoneMobileIcon,
  'android-development': DevicePhoneMobileIcon,
  'flutter-development': DevicePhoneMobileIcon,
  'react-native-development': DevicePhoneMobileIcon,
  'cross-platform-apps': DevicePhoneMobileIcon,
  'api-development': LinkIcon,
  'rest-api-development': LinkIcon,
  'graphql-development': CubeIcon,
  'third-party-api-integration': ArrowPathIcon,
  'api-gateway': ServerStackIcon,
  'saas-development': CloudIcon,
  'mvp-development': RocketLaunchIcon,
  'multi-tenant-architecture': BuildingOffice2Icon,
  'saas-migration': ArrowsRightLeftIcon,
  'wordpress-development': GlobeEuropeAfricaIcon,
  'custom-wordpress-themes': PaintBrushIcon,
  'wordpress-plugin-development': Cog6ToothIcon,
  'wordpress-optimization': FireIcon,
  'enterprise-software': BuildingOffice2Icon,
  'crm-development': InboxStackIcon,
  'erp-development': TableCellsIcon,
  'hrms-development': UsersIcon,
  'custom-business-software': Cog6ToothIcon,
  'web3-blockchain': CubeTransparentIcon,
  'smart-contracts': CodeBracketIcon,
  'dapp-development': CubeTransparentIcon,
  'nft-marketplace': TagIcon,
  'defi-solutions': CurrencyDollarIcon,
  'tokenization': CircleStackIcon,
  'no-code-low-code': Squares2X2Icon,
  'bubble-development': Squares2X2Icon,
  'webflow-development': PaintBrushIcon,
  'airtable-solutions': TableCellsIcon,
  'zapier-automation': ArrowPathIcon,

  // ── aiData ──
  'ai-solutions': CpuChipIcon,
  'ai-consulting-strategy': CpuChipIcon,
  'custom-ai-development': BeakerIcon,
  'ai-integration': ArrowPathIcon,
  'ai-poc-mvp': SparklesIcon,
  'machine-learning': ChartBarIcon,
  'predictive-analytics': ChartBarIcon,
  'nlp-text-processing': DocumentTextIcon,
  'recommendation-systems': AdjustmentsHorizontalIcon,
  'anomaly-detection': SignalIcon,
  'time-series-forecasting': ClockIcon,
  'conversational-ai': ChatBubbleLeftRightIcon,
  'chatbot-development': ChatBubbleLeftRightIcon,
  'voice-assistant-development': SpeakerWaveIcon,
  'whatsapp-bots': ChatBubbleLeftRightIcon,
  'customer-service-ai': ChatBubbleBottomCenterTextIcon,
  'computer-vision': EyeIcon,
  'image-recognition': EyeIcon,
  'object-detection': ViewfinderCircleIcon,
  'video-analytics': VideoCameraIcon,
  'ocr-document-processing': DocumentTextIcon,
  'llm-services': BoltIcon,
  'llm-finetuning': BoltIcon,
  'prompt-engineering': PencilSquareIcon,
  'gpt-claude-api-integration': CpuChipIcon,
  'custom-llm-development': BeakerIcon,
  'ai-agents': UserGroupIcon,
  'autonomous-agents': SparklesIcon,
  'multi-agent-systems': UserGroupIcon,
  'ai-workflow-automation': ArrowPathIcon,
  'rag-solutions': BookOpenIcon,
  'knowledge-base-ai': BookOpenIcon,
  'document-qa': DocumentTextIcon,
  'enterprise-search-ai': MagnifyingGlassIcon,
  'python-automation': CommandLineIcon,
  'web-scraping': CommandLineIcon,
  'workflow-automation': ArrowPathIcon,
  'data-pipeline-automation': CircleStackIcon,
  'rpa-solutions': Cog6ToothIcon,

  // ── marketing ──
  'seo': MagnifyingGlassIcon,
  'technical-seo': WrenchScrewdriverIcon,
  'local-seo': MagnifyingGlassIcon,
  'international-seo': GlobeAltIcon,
  'link-building': LinkIcon,
  'ecommerce-seo': ShoppingCartIcon,
  'geo-ai-search-optimization': SparklesIcon,
  'google-ads': CursorArrowRaysIcon,
  'google-search-ads': CursorArrowRaysIcon,
  'google-display-ads': PhotoIcon,
  'youtube-ads': VideoCameraIcon,
  'google-shopping': ShoppingCartIcon,
  'performance-max': FireIcon,
  'meta-ads': ShareIcon,
  'facebook-ads': ShareIcon,
  'instagram-ads': PhotoIcon,
  'advantage-plus-campaigns': SparklesIcon,
  'social-media-marketing': MegaphoneIcon,
  'social-media-management': MegaphoneIcon,
  'influencer-marketing': HandThumbUpIcon,
  'community-management': UsersIcon,
  'social-commerce': ShoppingCartIcon,
  'tiktok-marketing': PlayIcon,
  'tiktok-ads': PlayIcon,
  'tiktok-shop': ShoppingCartIcon,
  'tiktok-content': FilmIcon,
  'linkedin-marketing': BriefcaseIcon,
  'linkedin-ads': BriefcaseIcon,
  'linkedin-lead-gen': UserGroupIcon,
  'company-page-management': BuildingOffice2Icon,
  'whatsapp-marketing': ChatBubbleLeftRightIcon,
  'whatsapp-business-api': ChatBubbleLeftRightIcon,
  'whatsapp-campaigns': ChatBubbleLeftRightIcon,
  'whatsapp-commerce': ShoppingCartIcon,
  'email-marketing': EnvelopeIcon,
  'email-automation': EnvelopeIcon,
  'newsletter-design': NewspaperIcon,
  'email-deliverability': EnvelopeIcon,
  'content-marketing': DocumentTextIcon,
  'blog-copywriting': PencilSquareIcon,
  'video-production-marketing': VideoCameraIcon,
  'content-strategy': DocumentTextIcon,
  'podcast-production': SpeakerWaveIcon,
  'cro': ArrowTrendingUpIcon,
  'ab-testing': AdjustmentsHorizontalIcon,
  'landing-page-optimization': RectangleGroupIcon,
  'funnel-optimization': FunnelIcon,
  'ux-analytics': ChartPieIcon,
  'marketing-automation': Cog6ToothIcon,
  'hubspot-implementation': Cog6ToothIcon,
  'salesforce-marketing-cloud': CloudIcon,
  'custom-marketing-automation': ArrowPathIcon,
  'marketplace-ads': TagIcon,
  'amazon-ppc': CursorArrowRaysIcon,
  'trendyol-ads': CursorArrowRaysIcon,
  'app-store-optimization': DevicePhoneMobileIcon,

  // ── design ──
  'ui-ux-design': PaintBrushIcon,
  'ui-design': PaintBrushIcon,
  'ux-research': MagnifyingGlassIcon,
  'prototyping-wireframing': RectangleGroupIcon,
  'design-systems': Squares2X2Icon,
  'mobile-app-design': DevicePhoneMobileIcon,
  'graphic-design': SwatchIcon,
  'logo-brand-identity': SwatchIcon,
  'print-packaging-design': DocumentTextIcon,
  'social-media-graphics': HashtagIcon,
  'presentation-design': PresentationChartLineIcon,
  'motion-graphics': FilmIcon,
  'explainer-videos': VideoCameraIcon,
  'social-animations': FilmIcon,
  'product-animations': FilmIcon,
  'web-design': ComputerDesktopIcon,
  'corporate-website-design': BuildingOffice2Icon,
  'landing-page-design': RectangleGroupIcon,
  'ecommerce-design': ShoppingCartIcon,
  'brand-strategy': LightBulbIcon,
  'brand-positioning': LightBulbIcon,
  'brand-guidelines': BookOpenIcon,
  'rebranding': ArrowPathIcon,
  '3d-ar-vr': ViewfinderCircleIcon,
  '3d-product-visualization': ViewfinderCircleIcon,
  'ar-experiences': ViewfinderCircleIcon,
  'virtual-tours': GlobeAltIcon,

  // ── infrastructure ──
  'devops-cloud': CloudIcon,
  'ci-cd-pipelines': ArrowPathIcon,
  'docker-kubernetes': CubeTransparentIcon,
  'cloud-management': CloudIcon,
  'infrastructure-as-code': CodeBracketIcon,
  'cloud-migration': CloudArrowUpIcon,
  'aws-migration': CloudArrowUpIcon,
  'azure-migration': CloudArrowUpIcon,
  'google-cloud-migration': CloudArrowUpIcon,
  'mlops-deployment': RocketLaunchIcon,
  'model-deployment': RocketLaunchIcon,
  'model-monitoring': SignalIcon,
  'ml-pipelines': ArrowPathIcon,
  'data-analytics': PresentationChartLineIcon,
  'business-intelligence': PresentationChartLineIcon,
  'big-data-etl': CircleStackIcon,
  'data-visualization': PresentationChartLineIcon,
  'real-time-analytics': SignalIcon,
  'cybersecurity': ShieldCheckIcon,
  'penetration-testing': ShieldCheckIcon,
  'security-audits-compliance': LockClosedIcon,
  'gdpr-compliance': ScaleIcon,
  'soc2-compliance': ScaleIcon,
  'database-services': CircleStackIcon,
  'database-design': CircleStackIcon,
  'database-optimization': FireIcon,
  'database-migration': ArrowsRightLeftIcon,
  'performance-optimization': FireIcon,
  'website-speed-optimization': FireIcon,
  'core-web-vitals': SignalIcon,
  'server-optimization': ServerStackIcon,
  'managed-services': WrenchIcon,
  'continuous-monitoring': SignalIcon,
  'maintenance-support': WrenchIcon,
  'disaster-recovery': ShieldCheckIcon,

  // ── consulting ──
  'digital-transformation': LightBulbIcon,
  'digital-strategy': LightBulbIcon,
  'process-digitization': ArrowPathIcon,
  'technology-consulting': LightBulbIcon,
  'tech-stack-assessment': CodeBracketIcon,
  'architecture-design': RectangleGroupIcon,
  'ai-strategy': CpuChipIcon,
  'ai-readiness-assessment': CpuChipIcon,
  'ai-roi-analysis': ChartBarIcon,
  'growth-strategy': ArrowTrendingUpIcon,
  'startup-services': RocketLaunchIcon,
  'startup-mvp-development': RocketLaunchIcon,
  'technical-cto': UserGroupIcon,
  'staff-augmentation': UsersIcon,
  'developer-outsourcing': UsersIcon,
  'dedicated-teams': UserGroupIcon,
};

// Gradient backgrounds for service tiles
const serviceGradients: Record<string, string> = {
  // ── webSoftware ──
  'web-development': 'from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border-blue-200/50',
  'frontend-development': 'from-blue-400/10 to-blue-500/10 hover:from-blue-400/20 hover:to-blue-500/20 border-blue-200/50',
  'backend-development': 'from-blue-600/10 to-blue-700/10 hover:from-blue-600/20 hover:to-blue-700/20 border-blue-200/50',
  'full-stack-development': 'from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border-blue-200/50',
  'progressive-web-apps': 'from-indigo-500/10 to-blue-500/10 hover:from-indigo-500/20 hover:to-blue-500/20 border-indigo-200/50',
  'headless-cms-development': 'from-sky-500/10 to-blue-500/10 hover:from-sky-500/20 hover:to-blue-500/20 border-sky-200/50',
  'jamstack-development': 'from-amber-500/10 to-blue-500/10 hover:from-amber-500/20 hover:to-blue-500/20 border-amber-200/50',
  'e-commerce': 'from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20 border-emerald-200/50',
  'shopify-development': 'from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border-green-200/50',
  'woocommerce-development': 'from-purple-500/10 to-violet-500/10 hover:from-purple-500/20 hover:to-violet-500/20 border-purple-200/50',
  'magento-development': 'from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border-orange-200/50',
  'custom-ecommerce': 'from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border-teal-200/50',
  'marketplace-development': 'from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-200/50',
  'b2b-ecommerce': 'from-cyan-500/10 to-emerald-500/10 hover:from-cyan-500/20 hover:to-emerald-500/20 border-cyan-200/50',
  'mobile-development': 'from-cyan-500/10 to-cyan-600/10 hover:from-cyan-500/20 hover:to-cyan-600/20 border-cyan-200/50',
  'ios-development': 'from-cyan-400/10 to-blue-400/10 hover:from-cyan-400/20 hover:to-blue-400/20 border-cyan-200/50',
  'android-development': 'from-green-500/10 to-lime-500/10 hover:from-green-500/20 hover:to-lime-500/20 border-green-200/50',
  'flutter-development': 'from-sky-500/10 to-cyan-500/10 hover:from-sky-500/20 hover:to-cyan-500/20 border-sky-200/50',
  'react-native-development': 'from-blue-400/10 to-cyan-400/10 hover:from-blue-400/20 hover:to-cyan-400/20 border-blue-200/50',
  'cross-platform-apps': 'from-indigo-400/10 to-cyan-400/10 hover:from-indigo-400/20 hover:to-cyan-400/20 border-indigo-200/50',
  'api-development': 'from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border-purple-200/50',
  'rest-api-development': 'from-purple-400/10 to-purple-500/10 hover:from-purple-400/20 hover:to-purple-500/20 border-purple-200/50',
  'graphql-development': 'from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border-pink-200/50',
  'third-party-api-integration': 'from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20 border-violet-200/50',
  'api-gateway': 'from-purple-600/10 to-indigo-500/10 hover:from-purple-600/20 hover:to-indigo-500/20 border-purple-200/50',
  'saas-development': 'from-sky-500/10 to-sky-600/10 hover:from-sky-500/20 hover:to-sky-600/20 border-sky-200/50',
  'mvp-development': 'from-orange-500/10 to-sky-500/10 hover:from-orange-500/20 hover:to-sky-500/20 border-orange-200/50',
  'multi-tenant-architecture': 'from-slate-500/10 to-sky-500/10 hover:from-slate-500/20 hover:to-sky-500/20 border-slate-200/50',
  'saas-migration': 'from-cyan-500/10 to-sky-500/10 hover:from-cyan-500/20 hover:to-sky-500/20 border-cyan-200/50',
  'wordpress-development': 'from-blue-400/10 to-indigo-500/10 hover:from-blue-400/20 hover:to-indigo-500/20 border-blue-200/50',
  'custom-wordpress-themes': 'from-indigo-400/10 to-blue-400/10 hover:from-indigo-400/20 hover:to-blue-400/20 border-indigo-200/50',
  'wordpress-plugin-development': 'from-blue-500/10 to-indigo-400/10 hover:from-blue-500/20 hover:to-indigo-400/20 border-blue-200/50',
  'wordpress-optimization': 'from-orange-400/10 to-blue-400/10 hover:from-orange-400/20 hover:to-blue-400/20 border-orange-200/50',
  'enterprise-software': 'from-slate-500/10 to-blue-500/10 hover:from-slate-500/20 hover:to-blue-500/20 border-slate-200/50',
  'crm-development': 'from-blue-500/10 to-slate-500/10 hover:from-blue-500/20 hover:to-slate-500/20 border-blue-200/50',
  'erp-development': 'from-indigo-500/10 to-slate-500/10 hover:from-indigo-500/20 hover:to-slate-500/20 border-indigo-200/50',
  'hrms-development': 'from-violet-500/10 to-slate-500/10 hover:from-violet-500/20 hover:to-slate-500/20 border-violet-200/50',
  'custom-business-software': 'from-gray-500/10 to-blue-500/10 hover:from-gray-500/20 hover:to-blue-500/20 border-gray-200/50',
  'web3-blockchain': 'from-purple-500/10 to-fuchsia-500/10 hover:from-purple-500/20 hover:to-fuchsia-500/20 border-purple-200/50',
  'smart-contracts': 'from-violet-500/10 to-fuchsia-500/10 hover:from-violet-500/20 hover:to-fuchsia-500/20 border-violet-200/50',
  'dapp-development': 'from-fuchsia-500/10 to-purple-500/10 hover:from-fuchsia-500/20 hover:to-purple-500/20 border-fuchsia-200/50',
  'nft-marketplace': 'from-pink-500/10 to-fuchsia-500/10 hover:from-pink-500/20 hover:to-fuchsia-500/20 border-pink-200/50',
  'defi-solutions': 'from-amber-500/10 to-purple-500/10 hover:from-amber-500/20 hover:to-purple-500/20 border-amber-200/50',
  'tokenization': 'from-emerald-500/10 to-purple-500/10 hover:from-emerald-500/20 hover:to-purple-500/20 border-emerald-200/50',
  'no-code-low-code': 'from-teal-500/10 to-blue-500/10 hover:from-teal-500/20 hover:to-blue-500/20 border-teal-200/50',
  'bubble-development': 'from-blue-400/10 to-teal-400/10 hover:from-blue-400/20 hover:to-teal-400/20 border-blue-200/50',
  'webflow-development': 'from-indigo-400/10 to-teal-400/10 hover:from-indigo-400/20 hover:to-teal-400/20 border-indigo-200/50',
  'airtable-solutions': 'from-yellow-400/10 to-teal-400/10 hover:from-yellow-400/20 hover:to-teal-400/20 border-yellow-200/50',
  'zapier-automation': 'from-orange-400/10 to-teal-400/10 hover:from-orange-400/20 hover:to-teal-400/20 border-orange-200/50',

  // ── aiData ──
  'ai-solutions': 'from-violet-500/10 to-violet-600/10 hover:from-violet-500/20 hover:to-violet-600/20 border-violet-200/50',
  'ai-consulting-strategy': 'from-violet-400/10 to-violet-500/10 hover:from-violet-400/20 hover:to-violet-500/20 border-violet-200/50',
  'custom-ai-development': 'from-purple-500/10 to-violet-500/10 hover:from-purple-500/20 hover:to-violet-500/20 border-purple-200/50',
  'ai-integration': 'from-indigo-500/10 to-violet-500/10 hover:from-indigo-500/20 hover:to-violet-500/20 border-indigo-200/50',
  'ai-poc-mvp': 'from-fuchsia-500/10 to-violet-500/10 hover:from-fuchsia-500/20 hover:to-violet-500/20 border-fuchsia-200/50',
  'machine-learning': 'from-indigo-500/10 to-indigo-600/10 hover:from-indigo-500/20 hover:to-indigo-600/20 border-indigo-200/50',
  'predictive-analytics': 'from-indigo-400/10 to-indigo-500/10 hover:from-indigo-400/20 hover:to-indigo-500/20 border-indigo-200/50',
  'nlp-text-processing': 'from-teal-500/10 to-indigo-500/10 hover:from-teal-500/20 hover:to-indigo-500/20 border-teal-200/50',
  'recommendation-systems': 'from-amber-500/10 to-indigo-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 border-amber-200/50',
  'anomaly-detection': 'from-red-500/10 to-indigo-500/10 hover:from-red-500/20 hover:to-indigo-500/20 border-red-200/50',
  'time-series-forecasting': 'from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 border-cyan-200/50',
  'conversational-ai': 'from-teal-500/10 to-teal-600/10 hover:from-teal-500/20 hover:to-teal-600/20 border-teal-200/50',
  'chatbot-development': 'from-teal-400/10 to-teal-500/10 hover:from-teal-400/20 hover:to-teal-500/20 border-teal-200/50',
  'voice-assistant-development': 'from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 border-cyan-200/50',
  'whatsapp-bots': 'from-green-500/10 to-teal-500/10 hover:from-green-500/20 hover:to-teal-500/20 border-green-200/50',
  'customer-service-ai': 'from-blue-500/10 to-teal-500/10 hover:from-blue-500/20 hover:to-teal-500/20 border-blue-200/50',
  'computer-vision': 'from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 border-amber-200/50',
  'image-recognition': 'from-amber-400/10 to-amber-500/10 hover:from-amber-400/20 hover:to-amber-500/20 border-amber-200/50',
  'object-detection': 'from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 border-orange-200/50',
  'video-analytics': 'from-red-500/10 to-amber-500/10 hover:from-red-500/20 hover:to-amber-500/20 border-red-200/50',
  'ocr-document-processing': 'from-yellow-500/10 to-amber-500/10 hover:from-yellow-500/20 hover:to-amber-500/20 border-yellow-200/50',
  'llm-services': 'from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 border-orange-200/50',
  'llm-finetuning': 'from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 border-orange-200/50',
  'prompt-engineering': 'from-rose-500/10 to-rose-600/10 hover:from-rose-500/20 hover:to-rose-600/20 border-rose-200/50',
  'gpt-claude-api-integration': 'from-violet-500/10 to-orange-500/10 hover:from-violet-500/20 hover:to-orange-500/20 border-violet-200/50',
  'custom-llm-development': 'from-purple-500/10 to-orange-500/10 hover:from-purple-500/20 hover:to-orange-500/20 border-purple-200/50',
  'ai-agents': 'from-fuchsia-500/10 to-fuchsia-600/10 hover:from-fuchsia-500/20 hover:to-fuchsia-600/20 border-fuchsia-200/50',
  'autonomous-agents': 'from-fuchsia-400/10 to-fuchsia-500/10 hover:from-fuchsia-400/20 hover:to-fuchsia-500/20 border-fuchsia-200/50',
  'multi-agent-systems': 'from-purple-500/10 to-fuchsia-500/10 hover:from-purple-500/20 hover:to-fuchsia-500/20 border-purple-200/50',
  'ai-workflow-automation': 'from-indigo-500/10 to-fuchsia-500/10 hover:from-indigo-500/20 hover:to-fuchsia-500/20 border-indigo-200/50',
  'rag-solutions': 'from-lime-500/10 to-lime-600/10 hover:from-lime-500/20 hover:to-lime-600/20 border-lime-200/50',
  'knowledge-base-ai': 'from-lime-400/10 to-lime-500/10 hover:from-lime-400/20 hover:to-lime-500/20 border-lime-200/50',
  'document-qa': 'from-green-500/10 to-lime-500/10 hover:from-green-500/20 hover:to-lime-500/20 border-green-200/50',
  'enterprise-search-ai': 'from-teal-500/10 to-lime-500/10 hover:from-teal-500/20 hover:to-lime-500/20 border-teal-200/50',
  'python-automation': 'from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20 border-yellow-200/50',
  'web-scraping': 'from-yellow-400/10 to-yellow-500/10 hover:from-yellow-400/20 hover:to-yellow-500/20 border-yellow-200/50',
  'workflow-automation': 'from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20 border-amber-200/50',
  'data-pipeline-automation': 'from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20 border-orange-200/50',
  'rpa-solutions': 'from-red-500/10 to-yellow-500/10 hover:from-red-500/20 hover:to-yellow-500/20 border-red-200/50',

  // ── marketing ──
  'seo': 'from-green-500/10 to-green-600/10 hover:from-green-500/20 hover:to-green-600/20 border-green-200/50',
  'technical-seo': 'from-green-400/10 to-green-500/10 hover:from-green-400/20 hover:to-green-500/20 border-green-200/50',
  'local-seo': 'from-lime-500/10 to-green-500/10 hover:from-lime-500/20 hover:to-green-500/20 border-lime-200/50',
  'international-seo': 'from-teal-500/10 to-green-500/10 hover:from-teal-500/20 hover:to-green-500/20 border-teal-200/50',
  'link-building': 'from-emerald-500/10 to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20 border-emerald-200/50',
  'ecommerce-seo': 'from-cyan-500/10 to-green-500/10 hover:from-cyan-500/20 hover:to-green-500/20 border-cyan-200/50',
  'geo-ai-search-optimization': 'from-violet-500/10 to-green-500/10 hover:from-violet-500/20 hover:to-green-500/20 border-violet-200/50',
  'google-ads': 'from-blue-500/10 to-yellow-500/10 hover:from-blue-500/20 hover:to-yellow-500/20 border-blue-200/50',
  'google-search-ads': 'from-blue-400/10 to-yellow-400/10 hover:from-blue-400/20 hover:to-yellow-400/20 border-blue-200/50',
  'google-display-ads': 'from-red-500/10 to-yellow-500/10 hover:from-red-500/20 hover:to-yellow-500/20 border-red-200/50',
  'youtube-ads': 'from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 border-red-200/50',
  'google-shopping': 'from-green-500/10 to-yellow-500/10 hover:from-green-500/20 hover:to-yellow-500/20 border-green-200/50',
  'performance-max': 'from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20 border-orange-200/50',
  'meta-ads': 'from-blue-600/10 to-indigo-500/10 hover:from-blue-600/20 hover:to-indigo-500/20 border-blue-200/50',
  'facebook-ads': 'from-blue-600/10 to-blue-700/10 hover:from-blue-600/20 hover:to-blue-700/20 border-blue-200/50',
  'instagram-ads': 'from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border-pink-200/50',
  'advantage-plus-campaigns': 'from-indigo-500/10 to-blue-500/10 hover:from-indigo-500/20 hover:to-blue-500/20 border-indigo-200/50',
  'social-media-marketing': 'from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 border-pink-200/50',
  'social-media-management': 'from-pink-400/10 to-rose-400/10 hover:from-pink-400/20 hover:to-rose-400/20 border-pink-200/50',
  'influencer-marketing': 'from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 border-rose-200/50',
  'community-management': 'from-fuchsia-500/10 to-pink-500/10 hover:from-fuchsia-500/20 hover:to-pink-500/20 border-fuchsia-200/50',
  'social-commerce': 'from-emerald-500/10 to-pink-500/10 hover:from-emerald-500/20 hover:to-pink-500/20 border-emerald-200/50',
  'tiktok-marketing': 'from-gray-800/10 to-pink-500/10 hover:from-gray-800/20 hover:to-pink-500/20 border-gray-200/50',
  'tiktok-ads': 'from-gray-800/10 to-pink-500/10 hover:from-gray-800/20 hover:to-pink-500/20 border-gray-200/50',
  'tiktok-shop': 'from-gray-700/10 to-red-500/10 hover:from-gray-700/20 hover:to-red-500/20 border-gray-200/50',
  'tiktok-content': 'from-gray-600/10 to-pink-400/10 hover:from-gray-600/20 hover:to-pink-400/20 border-gray-200/50',
  'linkedin-marketing': 'from-blue-700/10 to-blue-500/10 hover:from-blue-700/20 hover:to-blue-500/20 border-blue-200/50',
  'linkedin-ads': 'from-blue-700/10 to-blue-500/10 hover:from-blue-700/20 hover:to-blue-500/20 border-blue-200/50',
  'linkedin-lead-gen': 'from-blue-600/10 to-blue-400/10 hover:from-blue-600/20 hover:to-blue-400/20 border-blue-200/50',
  'company-page-management': 'from-blue-500/10 to-blue-400/10 hover:from-blue-500/20 hover:to-blue-400/20 border-blue-200/50',
  'whatsapp-marketing': 'from-green-600/10 to-green-500/10 hover:from-green-600/20 hover:to-green-500/20 border-green-200/50',
  'whatsapp-business-api': 'from-green-500/10 to-green-400/10 hover:from-green-500/20 hover:to-green-400/20 border-green-200/50',
  'whatsapp-campaigns': 'from-green-400/10 to-emerald-400/10 hover:from-green-400/20 hover:to-emerald-400/20 border-green-200/50',
  'whatsapp-commerce': 'from-emerald-500/10 to-green-400/10 hover:from-emerald-500/20 hover:to-green-400/20 border-emerald-200/50',
  'email-marketing': 'from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border-amber-200/50',
  'email-automation': 'from-amber-400/10 to-orange-400/10 hover:from-amber-400/20 hover:to-orange-400/20 border-amber-200/50',
  'newsletter-design': 'from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 border-orange-200/50',
  'email-deliverability': 'from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 border-amber-200/50',
  'content-marketing': 'from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border-teal-200/50',
  'blog-copywriting': 'from-teal-400/10 to-emerald-400/10 hover:from-teal-400/20 hover:to-emerald-400/20 border-teal-200/50',
  'video-production-marketing': 'from-red-500/10 to-teal-500/10 hover:from-red-500/20 hover:to-teal-500/20 border-red-200/50',
  'content-strategy': 'from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-200/50',
  'podcast-production': 'from-violet-500/10 to-teal-500/10 hover:from-violet-500/20 hover:to-teal-500/20 border-violet-200/50',
  'cro': 'from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border-orange-200/50',
  'ab-testing': 'from-orange-400/10 to-red-400/10 hover:from-orange-400/20 hover:to-red-400/20 border-orange-200/50',
  'landing-page-optimization': 'from-red-400/10 to-orange-400/10 hover:from-red-400/20 hover:to-orange-400/20 border-red-200/50',
  'funnel-optimization': 'from-amber-500/10 to-red-500/10 hover:from-amber-500/20 hover:to-red-500/20 border-amber-200/50',
  'ux-analytics': 'from-pink-500/10 to-orange-500/10 hover:from-pink-500/20 hover:to-orange-500/20 border-pink-200/50',
  'marketing-automation': 'from-indigo-500/10 to-blue-500/10 hover:from-indigo-500/20 hover:to-blue-500/20 border-indigo-200/50',
  'hubspot-implementation': 'from-orange-500/10 to-indigo-500/10 hover:from-orange-500/20 hover:to-indigo-500/20 border-orange-200/50',
  'salesforce-marketing-cloud': 'from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border-blue-200/50',
  'custom-marketing-automation': 'from-violet-500/10 to-indigo-500/10 hover:from-violet-500/20 hover:to-indigo-500/20 border-violet-200/50',
  'marketplace-ads': 'from-emerald-500/10 to-amber-500/10 hover:from-emerald-500/20 hover:to-amber-500/20 border-emerald-200/50',
  'amazon-ppc': 'from-amber-500/10 to-emerald-500/10 hover:from-amber-500/20 hover:to-emerald-500/20 border-amber-200/50',
  'trendyol-ads': 'from-orange-500/10 to-emerald-500/10 hover:from-orange-500/20 hover:to-emerald-500/20 border-orange-200/50',
  'app-store-optimization': 'from-blue-500/10 to-emerald-500/10 hover:from-blue-500/20 hover:to-emerald-500/20 border-blue-200/50',

  // ── design ──
  'ui-ux-design': 'from-pink-500/10 to-pink-600/10 hover:from-pink-500/20 hover:to-pink-600/20 border-pink-200/50',
  'ui-design': 'from-pink-400/10 to-pink-500/10 hover:from-pink-400/20 hover:to-pink-500/20 border-pink-200/50',
  'ux-research': 'from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 border-rose-200/50',
  'prototyping-wireframing': 'from-fuchsia-500/10 to-pink-500/10 hover:from-fuchsia-500/20 hover:to-pink-500/20 border-fuchsia-200/50',
  'design-systems': 'from-violet-500/10 to-pink-500/10 hover:from-violet-500/20 hover:to-pink-500/20 border-violet-200/50',
  'mobile-app-design': 'from-cyan-500/10 to-pink-500/10 hover:from-cyan-500/20 hover:to-pink-500/20 border-cyan-200/50',
  'graphic-design': 'from-fuchsia-500/10 to-fuchsia-600/10 hover:from-fuchsia-500/20 hover:to-fuchsia-600/20 border-fuchsia-200/50',
  'logo-brand-identity': 'from-fuchsia-400/10 to-fuchsia-500/10 hover:from-fuchsia-400/20 hover:to-fuchsia-500/20 border-fuchsia-200/50',
  'print-packaging-design': 'from-amber-500/10 to-fuchsia-500/10 hover:from-amber-500/20 hover:to-fuchsia-500/20 border-amber-200/50',
  'social-media-graphics': 'from-pink-500/10 to-fuchsia-400/10 hover:from-pink-500/20 hover:to-fuchsia-400/20 border-pink-200/50',
  'presentation-design': 'from-indigo-500/10 to-fuchsia-500/10 hover:from-indigo-500/20 hover:to-fuchsia-500/20 border-indigo-200/50',
  'motion-graphics': 'from-violet-500/10 to-fuchsia-500/10 hover:from-violet-500/20 hover:to-fuchsia-500/20 border-violet-200/50',
  'explainer-videos': 'from-red-500/10 to-violet-500/10 hover:from-red-500/20 hover:to-violet-500/20 border-red-200/50',
  'social-animations': 'from-pink-500/10 to-violet-500/10 hover:from-pink-500/20 hover:to-violet-500/20 border-pink-200/50',
  'product-animations': 'from-fuchsia-500/10 to-violet-500/10 hover:from-fuchsia-500/20 hover:to-violet-500/20 border-fuchsia-200/50',
  'web-design': 'from-blue-500/10 to-pink-500/10 hover:from-blue-500/20 hover:to-pink-500/20 border-blue-200/50',
  'corporate-website-design': 'from-slate-500/10 to-blue-500/10 hover:from-slate-500/20 hover:to-blue-500/20 border-slate-200/50',
  'landing-page-design': 'from-indigo-500/10 to-pink-500/10 hover:from-indigo-500/20 hover:to-pink-500/20 border-indigo-200/50',
  'ecommerce-design': 'from-emerald-500/10 to-pink-500/10 hover:from-emerald-500/20 hover:to-pink-500/20 border-emerald-200/50',
  'brand-strategy': 'from-amber-500/10 to-pink-500/10 hover:from-amber-500/20 hover:to-pink-500/20 border-amber-200/50',
  'brand-positioning': 'from-amber-400/10 to-pink-400/10 hover:from-amber-400/20 hover:to-pink-400/20 border-amber-200/50',
  'brand-guidelines': 'from-orange-500/10 to-pink-500/10 hover:from-orange-500/20 hover:to-pink-500/20 border-orange-200/50',
  'rebranding': 'from-rose-500/10 to-amber-500/10 hover:from-rose-500/20 hover:to-amber-500/20 border-rose-200/50',
  '3d-ar-vr': 'from-cyan-500/10 to-violet-500/10 hover:from-cyan-500/20 hover:to-violet-500/20 border-cyan-200/50',
  '3d-product-visualization': 'from-cyan-400/10 to-violet-400/10 hover:from-cyan-400/20 hover:to-violet-400/20 border-cyan-200/50',
  'ar-experiences': 'from-teal-500/10 to-violet-500/10 hover:from-teal-500/20 hover:to-violet-500/20 border-teal-200/50',
  'virtual-tours': 'from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border-blue-200/50',

  // ── infrastructure ──
  'devops-cloud': 'from-sky-500/10 to-sky-600/10 hover:from-sky-500/20 hover:to-sky-600/20 border-sky-200/50',
  'ci-cd-pipelines': 'from-sky-400/10 to-sky-500/10 hover:from-sky-400/20 hover:to-sky-500/20 border-sky-200/50',
  'docker-kubernetes': 'from-blue-500/10 to-sky-500/10 hover:from-blue-500/20 hover:to-sky-500/20 border-blue-200/50',
  'cloud-management': 'from-indigo-500/10 to-sky-500/10 hover:from-indigo-500/20 hover:to-sky-500/20 border-indigo-200/50',
  'infrastructure-as-code': 'from-violet-500/10 to-sky-500/10 hover:from-violet-500/20 hover:to-sky-500/20 border-violet-200/50',
  'cloud-migration': 'from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border-cyan-200/50',
  'aws-migration': 'from-orange-500/10 to-cyan-500/10 hover:from-orange-500/20 hover:to-cyan-500/20 border-orange-200/50',
  'azure-migration': 'from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border-blue-200/50',
  'google-cloud-migration': 'from-red-500/10 to-cyan-500/10 hover:from-red-500/20 hover:to-cyan-500/20 border-red-200/50',
  'mlops-deployment': 'from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 border-red-200/50',
  'model-deployment': 'from-red-400/10 to-red-500/10 hover:from-red-400/20 hover:to-red-500/20 border-red-200/50',
  'model-monitoring': 'from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border-orange-200/50',
  'ml-pipelines': 'from-amber-500/10 to-red-500/10 hover:from-amber-500/20 hover:to-red-500/20 border-amber-200/50',
  'data-analytics': 'from-slate-500/10 to-slate-600/10 hover:from-slate-500/20 hover:to-slate-600/20 border-slate-200/50',
  'business-intelligence': 'from-slate-400/10 to-slate-500/10 hover:from-slate-400/20 hover:to-slate-500/20 border-slate-200/50',
  'big-data-etl': 'from-gray-500/10 to-slate-500/10 hover:from-gray-500/20 hover:to-slate-500/20 border-gray-200/50',
  'data-visualization': 'from-indigo-500/10 to-slate-500/10 hover:from-indigo-500/20 hover:to-slate-500/20 border-indigo-200/50',
  'real-time-analytics': 'from-green-500/10 to-slate-500/10 hover:from-green-500/20 hover:to-slate-500/20 border-green-200/50',
  'cybersecurity': 'from-gray-500/10 to-gray-600/10 hover:from-gray-500/20 hover:to-gray-600/20 border-gray-200/50',
  'penetration-testing': 'from-red-500/10 to-gray-500/10 hover:from-red-500/20 hover:to-gray-500/20 border-red-200/50',
  'security-audits-compliance': 'from-gray-600/10 to-gray-700/10 hover:from-gray-600/20 hover:to-gray-700/20 border-gray-200/50',
  'gdpr-compliance': 'from-blue-500/10 to-gray-500/10 hover:from-blue-500/20 hover:to-gray-500/20 border-blue-200/50',
  'soc2-compliance': 'from-indigo-500/10 to-gray-500/10 hover:from-indigo-500/20 hover:to-gray-500/20 border-indigo-200/50',
  'database-services': 'from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-200/50',
  'database-design': 'from-emerald-400/10 to-teal-400/10 hover:from-emerald-400/20 hover:to-teal-400/20 border-emerald-200/50',
  'database-optimization': 'from-orange-500/10 to-emerald-500/10 hover:from-orange-500/20 hover:to-emerald-500/20 border-orange-200/50',
  'database-migration': 'from-cyan-500/10 to-emerald-500/10 hover:from-cyan-500/20 hover:to-emerald-500/20 border-cyan-200/50',
  'performance-optimization': 'from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 border-orange-200/50',
  'website-speed-optimization': 'from-orange-400/10 to-amber-400/10 hover:from-orange-400/20 hover:to-amber-400/20 border-orange-200/50',
  'core-web-vitals': 'from-green-500/10 to-orange-500/10 hover:from-green-500/20 hover:to-orange-500/20 border-green-200/50',
  'server-optimization': 'from-blue-500/10 to-orange-500/10 hover:from-blue-500/20 hover:to-orange-500/20 border-blue-200/50',
  'managed-services': 'from-teal-500/10 to-sky-500/10 hover:from-teal-500/20 hover:to-sky-500/20 border-teal-200/50',
  'continuous-monitoring': 'from-teal-400/10 to-sky-400/10 hover:from-teal-400/20 hover:to-sky-400/20 border-teal-200/50',
  'maintenance-support': 'from-sky-500/10 to-teal-500/10 hover:from-sky-500/20 hover:to-teal-500/20 border-sky-200/50',
  'disaster-recovery': 'from-red-500/10 to-teal-500/10 hover:from-red-500/20 hover:to-teal-500/20 border-red-200/50',

  // ── consulting ──
  'digital-transformation': 'from-slate-500/10 to-slate-600/10 hover:from-slate-500/20 hover:to-slate-600/20 border-slate-200/50',
  'digital-strategy': 'from-slate-400/10 to-slate-500/10 hover:from-slate-400/20 hover:to-slate-500/20 border-slate-200/50',
  'process-digitization': 'from-blue-500/10 to-slate-500/10 hover:from-blue-500/20 hover:to-slate-500/20 border-blue-200/50',
  'technology-consulting': 'from-indigo-500/10 to-slate-500/10 hover:from-indigo-500/20 hover:to-slate-500/20 border-indigo-200/50',
  'tech-stack-assessment': 'from-violet-500/10 to-slate-500/10 hover:from-violet-500/20 hover:to-slate-500/20 border-violet-200/50',
  'architecture-design': 'from-purple-500/10 to-slate-500/10 hover:from-purple-500/20 hover:to-slate-500/20 border-purple-200/50',
  'ai-strategy': 'from-violet-500/10 to-indigo-500/10 hover:from-violet-500/20 hover:to-indigo-500/20 border-violet-200/50',
  'ai-readiness-assessment': 'from-violet-400/10 to-indigo-400/10 hover:from-violet-400/20 hover:to-indigo-400/20 border-violet-200/50',
  'ai-roi-analysis': 'from-indigo-500/10 to-violet-500/10 hover:from-indigo-500/20 hover:to-violet-500/20 border-indigo-200/50',
  'growth-strategy': 'from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border-green-200/50',
  'startup-services': 'from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 border-orange-200/50',
  'startup-mvp-development': 'from-orange-400/10 to-amber-400/10 hover:from-orange-400/20 hover:to-amber-400/20 border-orange-200/50',
  'technical-cto': 'from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 border-red-200/50',
  'staff-augmentation': 'from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 border-cyan-200/50',
  'developer-outsourcing': 'from-cyan-400/10 to-teal-400/10 hover:from-cyan-400/20 hover:to-teal-400/20 border-cyan-200/50',
  'dedicated-teams': 'from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 border-teal-200/50',
};

// Icon colors for services
const serviceIconColors: Record<string, string> = {
  // ── webSoftware ──
  'web-development': 'text-blue-600',
  'frontend-development': 'text-blue-500',
  'backend-development': 'text-blue-700',
  'full-stack-development': 'text-blue-600',
  'progressive-web-apps': 'text-indigo-600',
  'headless-cms-development': 'text-sky-600',
  'jamstack-development': 'text-amber-600',
  'e-commerce': 'text-emerald-600',
  'shopify-development': 'text-green-600',
  'woocommerce-development': 'text-purple-600',
  'magento-development': 'text-orange-600',
  'custom-ecommerce': 'text-teal-600',
  'marketplace-development': 'text-emerald-600',
  'b2b-ecommerce': 'text-cyan-600',
  'mobile-development': 'text-cyan-600',
  'ios-development': 'text-cyan-600',
  'android-development': 'text-green-600',
  'flutter-development': 'text-sky-600',
  'react-native-development': 'text-blue-500',
  'cross-platform-apps': 'text-indigo-500',
  'api-development': 'text-purple-600',
  'rest-api-development': 'text-purple-500',
  'graphql-development': 'text-pink-600',
  'third-party-api-integration': 'text-violet-600',
  'api-gateway': 'text-purple-700',
  'saas-development': 'text-sky-600',
  'mvp-development': 'text-orange-600',
  'multi-tenant-architecture': 'text-slate-600',
  'saas-migration': 'text-cyan-600',
  'wordpress-development': 'text-blue-500',
  'custom-wordpress-themes': 'text-indigo-500',
  'wordpress-plugin-development': 'text-blue-600',
  'wordpress-optimization': 'text-orange-500',
  'enterprise-software': 'text-slate-600',
  'crm-development': 'text-blue-600',
  'erp-development': 'text-indigo-600',
  'hrms-development': 'text-violet-600',
  'custom-business-software': 'text-gray-600',
  'web3-blockchain': 'text-purple-600',
  'smart-contracts': 'text-violet-600',
  'dapp-development': 'text-fuchsia-600',
  'nft-marketplace': 'text-pink-600',
  'defi-solutions': 'text-amber-600',
  'tokenization': 'text-emerald-600',
  'no-code-low-code': 'text-teal-600',
  'bubble-development': 'text-blue-500',
  'webflow-development': 'text-indigo-500',
  'airtable-solutions': 'text-yellow-600',
  'zapier-automation': 'text-orange-500',

  // ── aiData ──
  'ai-solutions': 'text-violet-600',
  'ai-consulting-strategy': 'text-violet-500',
  'custom-ai-development': 'text-purple-600',
  'ai-integration': 'text-indigo-600',
  'ai-poc-mvp': 'text-fuchsia-600',
  'machine-learning': 'text-indigo-600',
  'predictive-analytics': 'text-indigo-500',
  'nlp-text-processing': 'text-teal-600',
  'recommendation-systems': 'text-amber-600',
  'anomaly-detection': 'text-red-600',
  'time-series-forecasting': 'text-cyan-600',
  'conversational-ai': 'text-teal-600',
  'chatbot-development': 'text-teal-500',
  'voice-assistant-development': 'text-cyan-600',
  'whatsapp-bots': 'text-green-600',
  'customer-service-ai': 'text-blue-600',
  'computer-vision': 'text-amber-600',
  'image-recognition': 'text-amber-500',
  'object-detection': 'text-orange-600',
  'video-analytics': 'text-red-600',
  'ocr-document-processing': 'text-yellow-600',
  'llm-services': 'text-orange-600',
  'llm-finetuning': 'text-orange-600',
  'prompt-engineering': 'text-rose-600',
  'gpt-claude-api-integration': 'text-violet-600',
  'custom-llm-development': 'text-purple-600',
  'ai-agents': 'text-fuchsia-600',
  'autonomous-agents': 'text-fuchsia-500',
  'multi-agent-systems': 'text-purple-600',
  'ai-workflow-automation': 'text-indigo-600',
  'rag-solutions': 'text-lime-600',
  'knowledge-base-ai': 'text-lime-500',
  'document-qa': 'text-green-600',
  'enterprise-search-ai': 'text-teal-600',
  'python-automation': 'text-yellow-600',
  'web-scraping': 'text-yellow-500',
  'workflow-automation': 'text-amber-600',
  'data-pipeline-automation': 'text-orange-600',
  'rpa-solutions': 'text-red-600',

  // ── marketing ──
  'seo': 'text-green-600',
  'technical-seo': 'text-green-500',
  'local-seo': 'text-lime-600',
  'international-seo': 'text-teal-600',
  'link-building': 'text-emerald-600',
  'ecommerce-seo': 'text-cyan-600',
  'geo-ai-search-optimization': 'text-violet-600',
  'google-ads': 'text-blue-600',
  'google-search-ads': 'text-blue-500',
  'google-display-ads': 'text-red-500',
  'youtube-ads': 'text-red-600',
  'google-shopping': 'text-green-600',
  'performance-max': 'text-orange-600',
  'meta-ads': 'text-blue-700',
  'facebook-ads': 'text-blue-700',
  'instagram-ads': 'text-pink-600',
  'advantage-plus-campaigns': 'text-indigo-600',
  'social-media-marketing': 'text-pink-600',
  'social-media-management': 'text-pink-500',
  'influencer-marketing': 'text-rose-600',
  'community-management': 'text-fuchsia-600',
  'social-commerce': 'text-emerald-600',
  'tiktok-marketing': 'text-gray-800',
  'tiktok-ads': 'text-gray-800',
  'tiktok-shop': 'text-gray-700',
  'tiktok-content': 'text-gray-600',
  'linkedin-marketing': 'text-blue-700',
  'linkedin-ads': 'text-blue-700',
  'linkedin-lead-gen': 'text-blue-600',
  'company-page-management': 'text-blue-500',
  'whatsapp-marketing': 'text-green-600',
  'whatsapp-business-api': 'text-green-500',
  'whatsapp-campaigns': 'text-green-500',
  'whatsapp-commerce': 'text-emerald-600',
  'email-marketing': 'text-amber-600',
  'email-automation': 'text-amber-500',
  'newsletter-design': 'text-orange-600',
  'email-deliverability': 'text-amber-600',
  'content-marketing': 'text-teal-600',
  'blog-copywriting': 'text-teal-500',
  'video-production-marketing': 'text-red-600',
  'content-strategy': 'text-emerald-600',
  'podcast-production': 'text-violet-600',
  'cro': 'text-orange-600',
  'ab-testing': 'text-orange-500',
  'landing-page-optimization': 'text-red-500',
  'funnel-optimization': 'text-amber-600',
  'ux-analytics': 'text-pink-600',
  'marketing-automation': 'text-indigo-600',
  'hubspot-implementation': 'text-orange-600',
  'salesforce-marketing-cloud': 'text-blue-600',
  'custom-marketing-automation': 'text-violet-600',
  'marketplace-ads': 'text-emerald-600',
  'amazon-ppc': 'text-amber-600',
  'trendyol-ads': 'text-orange-600',
  'app-store-optimization': 'text-blue-600',

  // ── design ──
  'ui-ux-design': 'text-pink-600',
  'ui-design': 'text-pink-500',
  'ux-research': 'text-rose-600',
  'prototyping-wireframing': 'text-fuchsia-600',
  'design-systems': 'text-violet-600',
  'mobile-app-design': 'text-cyan-600',
  'graphic-design': 'text-fuchsia-600',
  'logo-brand-identity': 'text-fuchsia-500',
  'print-packaging-design': 'text-amber-600',
  'social-media-graphics': 'text-pink-600',
  'presentation-design': 'text-indigo-600',
  'motion-graphics': 'text-violet-600',
  'explainer-videos': 'text-red-600',
  'social-animations': 'text-pink-600',
  'product-animations': 'text-fuchsia-600',
  'web-design': 'text-blue-600',
  'corporate-website-design': 'text-slate-600',
  'landing-page-design': 'text-indigo-600',
  'ecommerce-design': 'text-emerald-600',
  'brand-strategy': 'text-amber-600',
  'brand-positioning': 'text-amber-500',
  'brand-guidelines': 'text-orange-600',
  'rebranding': 'text-rose-600',
  '3d-ar-vr': 'text-cyan-600',
  '3d-product-visualization': 'text-cyan-500',
  'ar-experiences': 'text-teal-600',
  'virtual-tours': 'text-blue-600',

  // ── infrastructure ──
  'devops-cloud': 'text-sky-600',
  'ci-cd-pipelines': 'text-sky-500',
  'docker-kubernetes': 'text-blue-600',
  'cloud-management': 'text-indigo-600',
  'infrastructure-as-code': 'text-violet-600',
  'cloud-migration': 'text-cyan-600',
  'aws-migration': 'text-orange-600',
  'azure-migration': 'text-blue-600',
  'google-cloud-migration': 'text-red-600',
  'mlops-deployment': 'text-red-600',
  'model-deployment': 'text-red-500',
  'model-monitoring': 'text-orange-600',
  'ml-pipelines': 'text-amber-600',
  'data-analytics': 'text-slate-600',
  'business-intelligence': 'text-slate-500',
  'big-data-etl': 'text-gray-600',
  'data-visualization': 'text-indigo-600',
  'real-time-analytics': 'text-green-600',
  'cybersecurity': 'text-gray-600',
  'penetration-testing': 'text-red-600',
  'security-audits-compliance': 'text-gray-700',
  'gdpr-compliance': 'text-blue-600',
  'soc2-compliance': 'text-indigo-600',
  'database-services': 'text-emerald-600',
  'database-design': 'text-emerald-500',
  'database-optimization': 'text-orange-600',
  'database-migration': 'text-cyan-600',
  'performance-optimization': 'text-orange-600',
  'website-speed-optimization': 'text-orange-500',
  'core-web-vitals': 'text-green-600',
  'server-optimization': 'text-blue-600',
  'managed-services': 'text-teal-600',
  'continuous-monitoring': 'text-teal-500',
  'maintenance-support': 'text-sky-600',
  'disaster-recovery': 'text-red-600',

  // ── consulting ──
  'digital-transformation': 'text-slate-600',
  'digital-strategy': 'text-slate-500',
  'process-digitization': 'text-blue-600',
  'technology-consulting': 'text-indigo-600',
  'tech-stack-assessment': 'text-violet-600',
  'architecture-design': 'text-purple-600',
  'ai-strategy': 'text-violet-600',
  'ai-readiness-assessment': 'text-violet-500',
  'ai-roi-analysis': 'text-indigo-600',
  'growth-strategy': 'text-green-600',
  'startup-services': 'text-orange-600',
  'startup-mvp-development': 'text-orange-500',
  'technical-cto': 'text-red-600',
  'staff-augmentation': 'text-cyan-600',
  'developer-outsourcing': 'text-cyan-500',
  'dedicated-teams': 'text-teal-600',
};

// Service categories with parent/child hierarchy
type ServiceEntry = { slug: string; children?: string[] };
const serviceCategories: Record<string, { key: string; icon: React.ElementType; gradient: string; services: ServiceEntry[] }> = {
  webSoftware: {
    key: 'webSoftware',
    icon: CodeBracketIcon,
    gradient: 'from-blue-500 to-blue-600',
    services: [
      { slug: 'web-development', children: ['frontend-development', 'backend-development', 'full-stack-development', 'progressive-web-apps', 'headless-cms-development', 'jamstack-development'] },
      { slug: 'e-commerce', children: ['shopify-development', 'woocommerce-development', 'magento-development', 'custom-ecommerce', 'marketplace-development', 'b2b-ecommerce'] },
      { slug: 'mobile-development', children: ['ios-development', 'android-development', 'flutter-development', 'react-native-development', 'cross-platform-apps'] },
      { slug: 'api-development', children: ['rest-api-development', 'graphql-development', 'third-party-api-integration', 'api-gateway'] },
      { slug: 'saas-development', children: ['mvp-development', 'multi-tenant-architecture', 'saas-migration'] },
      { slug: 'wordpress-development', children: ['custom-wordpress-themes', 'wordpress-plugin-development', 'wordpress-optimization'] },
      { slug: 'enterprise-software', children: ['crm-development', 'erp-development', 'hrms-development', 'custom-business-software'] },
      { slug: 'web3-blockchain', children: ['smart-contracts', 'dapp-development', 'nft-marketplace', 'defi-solutions', 'tokenization'] },
      { slug: 'no-code-low-code', children: ['bubble-development', 'webflow-development', 'airtable-solutions', 'zapier-automation'] },
    ]
  },
  aiData: {
    key: 'aiData',
    icon: CpuChipIcon,
    gradient: 'from-violet-500 to-violet-600',
    services: [
      { slug: 'ai-solutions', children: ['ai-consulting-strategy', 'custom-ai-development', 'ai-integration', 'ai-poc-mvp'] },
      { slug: 'machine-learning', children: ['predictive-analytics', 'nlp-text-processing', 'recommendation-systems', 'anomaly-detection', 'time-series-forecasting'] },
      { slug: 'conversational-ai', children: ['chatbot-development', 'voice-assistant-development', 'whatsapp-bots', 'customer-service-ai'] },
      { slug: 'computer-vision', children: ['image-recognition', 'object-detection', 'video-analytics', 'ocr-document-processing'] },
      { slug: 'llm-services', children: ['llm-finetuning', 'prompt-engineering', 'gpt-claude-api-integration', 'custom-llm-development'] },
      { slug: 'ai-agents', children: ['autonomous-agents', 'multi-agent-systems', 'ai-workflow-automation'] },
      { slug: 'rag-solutions', children: ['knowledge-base-ai', 'document-qa', 'enterprise-search-ai'] },
      { slug: 'python-automation', children: ['web-scraping', 'workflow-automation', 'data-pipeline-automation', 'rpa-solutions'] },
    ]
  },
  marketing: {
    key: 'marketing',
    icon: MegaphoneIcon,
    gradient: 'from-green-500 to-green-600',
    services: [
      { slug: 'seo', children: ['technical-seo', 'local-seo', 'international-seo', 'link-building', 'ecommerce-seo', 'geo-ai-search-optimization'] },
      { slug: 'google-ads', children: ['google-search-ads', 'google-display-ads', 'youtube-ads', 'google-shopping', 'performance-max'] },
      { slug: 'meta-ads', children: ['facebook-ads', 'instagram-ads', 'advantage-plus-campaigns'] },
      { slug: 'social-media-marketing', children: ['social-media-management', 'influencer-marketing', 'community-management', 'social-commerce'] },
      { slug: 'tiktok-marketing', children: ['tiktok-ads', 'tiktok-shop', 'tiktok-content'] },
      { slug: 'linkedin-marketing', children: ['linkedin-ads', 'linkedin-lead-gen', 'company-page-management'] },
      { slug: 'whatsapp-marketing', children: ['whatsapp-business-api', 'whatsapp-campaigns', 'whatsapp-commerce'] },
      { slug: 'email-marketing', children: ['email-automation', 'newsletter-design', 'email-deliverability'] },
      { slug: 'content-marketing', children: ['blog-copywriting', 'video-production-marketing', 'content-strategy', 'podcast-production'] },
      { slug: 'cro', children: ['ab-testing', 'landing-page-optimization', 'funnel-optimization', 'ux-analytics'] },
      { slug: 'marketing-automation', children: ['hubspot-implementation', 'salesforce-marketing-cloud', 'custom-marketing-automation'] },
      { slug: 'marketplace-ads', children: ['amazon-ppc', 'trendyol-ads', 'app-store-optimization'] },
    ]
  },
  design: {
    key: 'design',
    icon: PaintBrushIcon,
    gradient: 'from-pink-500 to-pink-600',
    services: [
      { slug: 'ui-ux-design', children: ['ui-design', 'ux-research', 'prototyping-wireframing', 'design-systems', 'mobile-app-design'] },
      { slug: 'graphic-design', children: ['logo-brand-identity', 'print-packaging-design', 'social-media-graphics', 'presentation-design'] },
      { slug: 'motion-graphics', children: ['explainer-videos', 'social-animations', 'product-animations'] },
      { slug: 'web-design', children: ['corporate-website-design', 'landing-page-design', 'ecommerce-design'] },
      { slug: 'brand-strategy', children: ['brand-positioning', 'brand-guidelines', 'rebranding'] },
      { slug: '3d-ar-vr', children: ['3d-product-visualization', 'ar-experiences', 'virtual-tours'] },
    ]
  },
  infrastructure: {
    key: 'infrastructure',
    icon: ServerStackIcon,
    gradient: 'from-orange-500 to-orange-600',
    services: [
      { slug: 'devops-cloud', children: ['ci-cd-pipelines', 'docker-kubernetes', 'cloud-management', 'infrastructure-as-code'] },
      { slug: 'cloud-migration', children: ['aws-migration', 'azure-migration', 'google-cloud-migration'] },
      { slug: 'mlops-deployment', children: ['model-deployment', 'model-monitoring', 'ml-pipelines'] },
      { slug: 'data-analytics', children: ['business-intelligence', 'big-data-etl', 'data-visualization', 'real-time-analytics'] },
      { slug: 'cybersecurity', children: ['penetration-testing', 'security-audits-compliance', 'gdpr-compliance', 'soc2-compliance'] },
      { slug: 'database-services', children: ['database-design', 'database-optimization', 'database-migration'] },
      { slug: 'performance-optimization', children: ['website-speed-optimization', 'core-web-vitals', 'server-optimization'] },
      { slug: 'managed-services', children: ['continuous-monitoring', 'maintenance-support', 'disaster-recovery'] },
    ]
  },
  consulting: {
    key: 'consulting',
    icon: LightBulbIcon,
    gradient: 'from-slate-500 to-slate-600',
    services: [
      { slug: 'digital-transformation', children: ['digital-strategy', 'process-digitization'] },
      { slug: 'technology-consulting', children: ['tech-stack-assessment', 'architecture-design'] },
      { slug: 'ai-strategy', children: ['ai-readiness-assessment', 'ai-roi-analysis'] },
      { slug: 'growth-strategy' },
      { slug: 'startup-services', children: ['startup-mvp-development', 'technical-cto'] },
      { slug: 'staff-augmentation', children: ['developer-outsourcing', 'dedicated-teams'] },
    ]
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('webSoftware');
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { locale, setLocale, isLoading, dir } = useTranslations();
  const t = useSectionTranslations('navbar');
  const tCommon = useSectionTranslations('common');
  const tServices = useSectionTranslations('megaMenu');

  // Convert localized pathname to English for detection
  // e.g., /tr/hizmetler/web-development → /services/web-development
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  const englishPath = delocalizePath(pathWithoutLocale, locale);

  // Detect if we are on a service detail page (microsite)
  const isServicePage = englishPath.includes('/services/') && englishPath.split('/').length > 2;

  // Extract current service slug from pathname (using English path)
  const getServiceSlug = () => {
    const parts = englishPath.split('/');
    const servicesIndex = parts.indexOf('services');
    if (servicesIndex !== -1 && parts[servicesIndex + 1]) {
      return parts[servicesIndex + 1];
    }
    return 'web-development';
  };
  const currentServiceSlug = getServiceSlug();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Standard Links (without services - it's handled separately)
  // Uses localizeFullPath for URL path localization
  const mainLinks = [
    { label: t('home'), href: '/', localizedHref: `/${locale}` },
    { label: t('projects'), href: '/projects', localizedHref: `/${locale}${localizeFullPath('/projects', locale)}` },
    { label: t('blog'), href: '/blog', localizedHref: `/${locale}${localizeFullPath('/blog', locale)}` },
    { label: t('about'), href: '/about', localizedHref: `/${locale}${localizeFullPath('/about', locale)}` },
    { label: t('contact'), href: '/contact', localizedHref: `/${locale}${localizeFullPath('/contact', locale)}` },
  ];

  // Service Microsite Links - separate pages for each section
  // Uses localizeFullPath to translate path segments for each locale
  const serviceLinks = [
    { label: t('serviceNav.overview'), href: `/services/${currentServiceSlug}`, localizedHref: `/${locale}${localizeFullPath(`/services/${currentServiceSlug}`, locale)}` },
    { label: t('serviceNav.features'), href: `/services/${currentServiceSlug}/features`, localizedHref: `/${locale}${localizeFullPath(`/services/${currentServiceSlug}/features`, locale)}` },
    { label: t('serviceNav.process'), href: `/services/${currentServiceSlug}/process`, localizedHref: `/${locale}${localizeFullPath(`/services/${currentServiceSlug}/process`, locale)}` },
    { label: t('serviceNav.techStack'), href: `/services/${currentServiceSlug}/tech-stack`, localizedHref: `/${locale}${localizeFullPath(`/services/${currentServiceSlug}/tech-stack`, locale)}` },
    { label: t('serviceNav.portfolio'), href: `/services/${currentServiceSlug}/portfolio`, localizedHref: `/${locale}${localizeFullPath(`/services/${currentServiceSlug}/portfolio`, locale)}` },
    { label: t('serviceNav.faq'), href: `/services/${currentServiceSlug}/faq`, localizedHref: `/${locale}${localizeFullPath(`/services/${currentServiceSlug}/faq`, locale)}` },
  ];

  const currentLinks = isServicePage ? serviceLinks : mainLinks;

  const handleLanguageChange = async (newLocale: Locale) => {
    setLanguageOpen(false);
    if (newLocale !== locale) {
      trackLanguageChange(locale, newLocale);
      await setLocale(newLocale);
    }
  };

  const handleLinkClick = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  // Get localized service path based on locale
  // Uses localizeFullPath to translate path segments (e.g., /services → /hizmetler for Turkish)
  const getServicePath = (slug: string) => {
    const englishPath = `/services/${slug}`;
    return `/${locale}${localizeFullPath(englishPath, locale)}`;
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50 transition-all duration-300
          ${scrolled
            ? 'glass-strong border-b border-glass shadow-lg py-3'
            : 'glass-subtle border-b border-glass/50 py-4'
          }
        `}
        dir={dir}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/images/logo/logo.png"
                alt="PakSoft Logo"
                width={160}
                height={160}
                className="rounded-sm"
                priority
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8">
              {/* Home Link */}
              {!isServicePage && (
                <li className="relative">
                  <Link
                    href={`/${locale}`}
                    className={`
                      text-sm font-medium tracking-wide transition-colors duration-250
                      ${pathname === `/${locale}` || pathname === `/${locale}/`
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    {t('home')}
                  </Link>
                  {(pathname === `/${locale}` || pathname === `/${locale}/`) && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />
                  )}
                </li>
              )}

              {/* Services Mega Dropdown - Only show when not on service page */}
              {!isServicePage && (
                <li className="relative" ref={servicesRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`
                      flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-250
                      ${pathname.includes('/services')
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    {t('services')}
                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {pathname.includes('/services') && !servicesOpen && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />
                  )}

                  {/* Mega Dropdown — 3-column layout with 6 categories */}
                  {servicesOpen && (
                    <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[95vw] md:w-[90vw] lg:w-[1100px] xl:w-[1200px] bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
                      {/* Header */}
                      <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">{t('services')}</h2>
                          <p className="text-sm text-gray-500 mt-0.5">150+ services across 6 categories</p>
                        </div>
                        <Link
                          href={`/${locale}/services`}
                          onClick={handleLinkClick}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          {tServices('viewAll')}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>

                      {/* Single scrollable area with 3 columns (2 rows of 3) */}
                      <div className="overflow-y-auto flex-1 px-8 py-6 scrollbar-thin">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                          {Object.entries(serviceCategories).map(([catKey, cat]) => {
                            const CatIcon = cat.icon;
                            return (
                              <div key={catKey}>
                                {/* Category header */}
                                <div className="flex items-center gap-2 mb-3">
                                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                                    <CatIcon className="w-3.5 h-3.5 text-white" />
                                  </div>
                                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">{tServices(cat.key)}</h3>
                                </div>
                                {/* Services list */}
                                <div className="space-y-0.5">
                                  {cat.services.map((service) => {
                                    const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                                    const gradient = serviceGradients[service.slug];
                                    const iconColor = serviceIconColors[service.slug];
                                    return (
                                      <div key={service.slug}>
                                        {/* Parent service */}
                                        <Link
                                          href={getServicePath(service.slug)}
                                          onClick={handleLinkClick}
                                          className={`group flex items-center gap-2 p-1.5 rounded-lg bg-gradient-to-br ${gradient} border transition-all duration-200 hover:shadow-sm hover:scale-[1.01]`}
                                        >
                                          <div className={`flex-shrink-0 w-7 h-7 rounded-md bg-white shadow-sm flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-200`}>
                                            <IconComponent className="w-3.5 h-3.5" />
                                          </div>
                                          <span className="text-xs font-semibold text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
                                            {tServices(`services.${service.slug}`)}
                                          </span>
                                        </Link>
                                        {/* Child sub-services */}
                                        {service.children && service.children.length > 0 && (
                                          <div className={`${dir === 'rtl' ? 'mr-3 pr-2 border-r' : 'ml-3 pl-2 border-l'} border-gray-200/80 my-0.5`}>
                                            {service.children.map((childSlug) => {
                                              const ChildIcon = serviceIcons[childSlug] || CpuChipIcon;
                                              const childColor = serviceIconColors[childSlug];
                                              return (
                                                <Link
                                                  key={childSlug}
                                                  href={getServicePath(childSlug)}
                                                  onClick={handleLinkClick}
                                                  className="group flex items-center gap-1.5 px-1.5 py-[3px] rounded-md hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                  <ChildIcon className={`w-3 h-3 ${childColor} flex-shrink-0 opacity-70 group-hover:opacity-100`} />
                                                  <span className="text-[11px] sm:text-xs text-gray-500 group-hover:text-gray-800 transition-colors leading-tight">
                                                    {tServices(`services.${childSlug}`)}
                                                  </span>
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )}

              {/* Service page links or remaining main links */}
              {isServicePage ? (
                serviceLinks.map(({ label, href, localizedHref }) => {
                  const isActive = pathname.endsWith(localizedHref);
                  return (
                    <li key={href} className="relative">
                      <Link
                        href={localizedHref}
                        className={`
                          text-sm font-medium tracking-wide transition-colors duration-250
                          ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}
                        `}
                      >
                        {label}
                      </Link>
                      {isActive && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />}
                    </li>
                  );
                })
              ) : (
                // Remaining main links (projects, blog, about, contact)
                mainLinks.slice(1).map(({ label, href, localizedHref }) => {
                  const isActive = pathname.endsWith(localizedHref);
                  return (
                    <li key={href} className="relative">
                      <Link
                        href={localizedHref}
                        onClick={handleLinkClick}
                        className={`
                          text-sm font-medium tracking-wide transition-colors duration-250
                          ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}
                        `}
                      >
                        {label}
                      </Link>
                      {isActive && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />}
                    </li>
                  );
                })
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                disabled={isLoading}
                className={`
                  flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900
                  transition-colors border border-gray-200 rounded-sm hover:border-gray-300
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span className="font-medium">
                  {localeNames[locale].flag} {locale.toUpperCase()}
                </span>
                <svg
                  className={`h-3 w-3 transition-transform duration-250 ${languageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 glass border-glass rounded-sm shadow-lg py-1 z-50">
                  {locales.map((lang) => (
                    <button
                      key={lang}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors
                        ${lang === locale
                          ? 'text-gray-900 bg-gray-50'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => handleLanguageChange(lang)}
                      disabled={isLoading}
                    >
                      <span>{localeNames[lang].flag}</span>
                      <span className="font-medium">{localeNames[lang].nativeName}</span>
                      {lang === locale && (
                        <svg className="h-4 w-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}${getLocalizedPath('/contact', locale)}`}
              onClick={() => trackQuoteRequest('navbar')}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium
                         bg-gray-900 text-white border border-gray-900 rounded-sm
                         hover:bg-gray-700 hover:border-gray-700 transition-all duration-250
                         hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <span>{t('getQuote')}</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors"
              aria-label={`${tCommon('menu')}`}
            >
              {open ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" dir={dir}>
          <div
            className="absolute inset-0 bg-gray-900/20"
            onClick={() => setOpen(false)}
          />

          <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-0 h-full w-80 glass-strong border-l border-glass shadow-2xl overflow-y-auto`}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">{tCommon('menu')}</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-sm hover:border-gray-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 px-6 py-6">
                <ul className="space-y-2">
                  {/* Home */}
                  <li>
                    <Link
                      href={`/${locale}`}
                      className={`
                        block px-4 py-3 text-sm font-medium transition-colors border-l-2
                        ${pathname === `/${locale}` || pathname === `/${locale}/`
                          ? 'text-gray-900 border-gray-900 bg-gray-50'
                          : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }
                      `}
                      onClick={() => setOpen(false)}
                    >
                      {t('home')}
                    </Link>
                  </li>

                  {/* Services Accordion */}
                  <li>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors border-l-2
                        ${pathname.includes('/services')
                          ? 'text-gray-900 border-gray-900 bg-gray-50'
                          : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }
                      `}
                    >
                      {t('services')}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileServicesOpen && (
                      <div className="mt-2 ml-4 space-y-4 pb-4">
                        {Object.entries(serviceCategories).map(([catKey, cat]) => {
                          const CatIcon = cat.icon;
                          return (
                            <div key={catKey}>
                              <div className="flex items-center gap-2 mb-2 px-2">
                                <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                                  <CatIcon className="w-3 h-3 text-white" />
                                </div>
                                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  {tServices(cat.key)}
                                </h4>
                              </div>
                              <ul className="space-y-0.5">
                                {cat.services.map((service) => {
                                  const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                                  const iconColor = serviceIconColors[service.slug];
                                  return (
                                    <li key={service.slug}>
                                      <Link
                                        href={getServicePath(service.slug)}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                                      >
                                        <IconComponent className={`w-4 h-4 ${iconColor}`} />
                                        <span>{tServices(`services.${service.slug}`)}</span>
                                      </Link>
                                      {/* Child sub-services */}
                                      {service.children && service.children.length > 0 && (
                                        <ul className="ml-6 border-l-2 border-gray-200 pl-2 space-y-0.5 mt-0.5 mb-1">
                                          {service.children.map((childSlug) => {
                                            const ChildIcon = serviceIcons[childSlug] || CpuChipIcon;
                                            const childColor = serviceIconColors[childSlug];
                                            return (
                                              <li key={childSlug}>
                                                <Link
                                                  href={getServicePath(childSlug)}
                                                  onClick={() => setOpen(false)}
                                                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
                                                >
                                                  <ChildIcon className={`w-3.5 h-3.5 ${childColor}`} />
                                                  <span>{tServices(`services.${childSlug}`)}</span>
                                                </Link>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}

                        {/* View All */}
                        <Link
                          href={`/${locale}/services`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-sm font-medium text-white bg-gray-900 px-4 py-2.5 mt-3 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          {tServices('viewAll')}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </li>

                  {/* Other Links */}
                  {mainLinks.slice(1).map(({ label, href, localizedHref }) => {
                    const isActive = pathname.endsWith(localizedHref);
                    return (
                      <li key={href}>
                        <Link
                          href={localizedHref}
                          className={`
                            block px-4 py-3 text-sm font-medium transition-colors border-l-2
                            ${isActive
                              ? 'text-gray-900 border-gray-900 bg-gray-50'
                              : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                            }
                          `}
                          onClick={() => setOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
                    {t('language')}
                  </h3>
                  <div className="space-y-2">
                    {locales.map((lang) => (
                      <button
                        key={lang}
                        className={`
                          flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors rounded-sm
                          ${lang === locale
                            ? 'text-gray-900 bg-gray-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }
                        `}
                        onClick={() => {
                          handleLanguageChange(lang);
                          setOpen(false);
                        }}
                        disabled={isLoading}
                      >
                        <span>{localeNames[lang].flag}</span>
                        <span className="font-medium">{localeNames[lang].nativeName}</span>
                        {lang === locale && (
                          <svg className="h-4 w-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <Link
                  href={`/${locale}${getLocalizedPath('/contact', locale)}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium
                             bg-gray-900 text-white border border-gray-900 rounded-sm
                             hover:bg-gray-700 hover:border-gray-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <span>{t('getQuote')}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {languageOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLanguageOpen(false)}
        />
      )}

      {servicesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setServicesOpen(false)}
        />
      )}
    </>
  );
}
