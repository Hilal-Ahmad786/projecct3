'use client';

// Service hero visuals — Modern Heritage scene registry.
// Each archetype is an advanced animated scene (İznik turquoise / lapis /
// terracotta / saffron palette, girih geometry) built from the shared
// primitives in ./primitives.tsx. The DB stores per-service animation
// config ({ heroVisual, motion, ... }) that selects a scene here.

import React from 'react';
import { motion } from 'framer-motion';

import {
  CodeEditorScene, TerminalScene, MobileDeviceScene,
  LayersStackScene, PuzzlePiecesScene, ServerStackScene,
} from './scenes-code';
import {
  ChartGraphScene, DashboardScene, DataFlowScene, MicroscopeScene,
} from './scenes-data';
import {
  BrainNetworkScene, NetworkNodesScene, ChatBubblesScene,
  LightbulbScene, CircuitBoardScene,
} from './scenes-ai';
import {
  CloudStackScene, GearSystemScene, ShieldLockScene,
  WorkflowDiagramScene, SatelliteScene, GlobeScene,
} from './scenes-infra';
import {
  MegaphoneScene, RocketLaunchScene, TargetBullseyeScene,
  ShoppingCartScene, PaletteCanvasScene,
} from './scenes-marketing';
import {
  SerpRankingScene, EmailInboxScene, FunnelScene, SocialFeedScene,
  KanbanBoardScene, VideoPlayerScene, DatabaseRingsScene, CryptoChainScene,
} from './scenes-growth';
import {
  KpiCardsScene, GaugeMeterScene, BrowserWindowScene, CmsBlocksScene,
  ColorSwatchScene, WireframeScene, NeuralLayersScene, ProductGridScene,
  CheckoutFlowScene, ContainerGridScene, AppScreensScene, AdCreativeScene,
  FilmStripScene, AutomationBotScene,
} from './scenes-extra';
import HomeHeroScene from '@/components/HomeHeroScene';

// ── Animation Types ──────────────────────────────────────────────────
export type HeroVisualType =
  | 'code-editor' | 'terminal' | 'mobile-device' | 'dashboard' | 'globe'
  | 'brain-network' | 'chart-graph' | 'palette-canvas' | 'shield-lock' | 'cloud-stack'
  | 'workflow-diagram' | 'data-flow' | 'shopping-cart-3d' | 'megaphone-3d' | 'rocket-launch'
  | 'puzzle-pieces' | 'circuit-board' | 'satellite' | 'microscope' | 'lightbulb'
  | 'gear-system' | 'network-nodes' | 'layers-stack' | 'target-bullseye' | 'chat-bubbles'
  | 'server-stack'
  | 'serp-ranking' | 'email-inbox' | 'funnel' | 'social-feed'
  | 'kanban-board' | 'video-player' | 'database-rings' | 'crypto-chain'
  | 'capability-hub'
  | 'kpi-cards' | 'gauge-meter' | 'browser-window' | 'cms-blocks'
  | 'color-swatch' | 'wireframe' | 'neural-layers' | 'product-grid'
  | 'checkout-flow' | 'container-grid' | 'app-screens' | 'ad-creative'
  | 'film-strip' | 'automation-bot';

export type BgPattern = 'grid' | 'dots' | 'waves' | 'diagonal-lines' | 'hexagons' | 'circles' | 'none';
export type DecorationType = 'circles' | 'squares' | 'triangles' | 'hexagons' | 'dots' | 'lines' | 'mixed';
export type MotionType = 'float' | 'pulse' | 'orbit' | 'wave' | 'morph' | 'type' | 'cascade' | 'spin-slow';
export type FeatureStyle = 'icon-top' | 'icon-left' | 'numbered' | 'bordered' | 'gradient-border' | 'minimal';
export type ProcessLayout = 'timeline' | 'cards' | 'steps-horizontal' | 'zigzag';

export interface ServiceAnimation {
  heroVisual: HeroVisualType;
  bgPattern: BgPattern;
  decorations: DecorationType;
  motion: MotionType;
  featureStyle: FeatureStyle;
  processLayout: ProcessLayout;
  // Enhanced options
  particleCount?: number;
  glowIntensity?: 'none' | 'subtle' | 'medium' | 'strong';
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'gradient';
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

// ── Motion Presets (kept for subpage animations & external use) ──────
export function getMotionProps(motionType: MotionType) {
  switch (motionType) {
    case 'float':
      return { animate: { y: [0, -12, 0] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'pulse':
      return { animate: { scale: [1, 1.05, 1] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'orbit':
      return { animate: { rotate: 360 }, transition: { duration: 20, repeat: Infinity, ease: 'linear' as const } };
    case 'wave':
      return { animate: { y: [0, -8, 0, 8, 0] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'morph':
      return { animate: { borderRadius: ['20%', '40%', '20%'] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'type':
      return { animate: { opacity: [0, 1, 1, 0] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'cascade':
      return { animate: { y: [0, -6, 0], opacity: [0.8, 1, 0.8] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'spin-slow':
      return { animate: { rotate: [0, 360] }, transition: { duration: 30, repeat: Infinity, ease: 'linear' as const } };
    default:
      return { animate: { y: [0, -12, 0] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const } };
  }
}

// ── Background Patterns ─────────────────────────────────────────────
export function BgPatternRenderer({ pattern: _ }: { pattern: BgPattern }) {
  return null;
}

// ── Floating Decorations ────────────────────────────────────────────
export function DecorationRenderer({ type, accentColor }: { type: DecorationType; accentColor: string }) {
  const items = getDecorationItems(type, accentColor);
  return <>{items}</>;
}

function getDecorationItems(type: DecorationType, color: string) {
  const positions = [
    { top: '10%', left: '5%', size: 'w-3 h-3', delay: 0 },
    { top: '20%', right: '10%', size: 'w-4 h-4', delay: 0.5 },
    { bottom: '30%', left: '8%', size: 'w-2 h-2', delay: 1 },
    { bottom: '15%', right: '15%', size: 'w-3 h-3', delay: 1.5 },
    { top: '50%', left: '3%', size: 'w-2 h-2', delay: 2 },
    { top: '70%', right: '5%', size: 'w-3 h-3', delay: 2.5 },
    { top: '35%', left: '12%', size: 'w-2 h-2', delay: 3 },
    { bottom: '40%', right: '8%', size: 'w-4 h-4', delay: 3.5 },
  ];

  return positions.map((pos, i) => {
    const style: React.CSSProperties = {};
    if (pos.top) style.top = pos.top;
    if (pos.bottom) style.bottom = pos.bottom;
    if (pos.left) style.left = pos.left;
    if (pos.right) style.right = pos.right;

    const shapeClass = getShapeClass(type, i);

    return (
      <motion.div
        key={i}
        className={`absolute ${pos.size} ${color} ${shapeClass} opacity-20`}
        style={style}
        animate={{
          y: [0, -15, 0],
          opacity: [0.1, 0.35, 0.1],
          rotate: [0, type === 'triangles' ? 180 : 0, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
      />
    );
  });
}

function getShapeClass(type: DecorationType, index: number): string {
  switch (type) {
    case 'circles': return 'rounded-full';
    case 'squares': return 'rounded-sm';
    case 'triangles': return 'rounded-none' + (index % 2 === 0 ? ' rotate-45' : ' rotate-12');
    case 'hexagons': return 'rounded-lg rotate-45';
    case 'dots': return 'rounded-full scale-75';
    case 'lines': return 'rounded-full w-8 !h-0.5';
    case 'mixed':
      return index % 3 === 0 ? 'rounded-full' : index % 3 === 1 ? 'rounded-sm' : 'rounded-lg rotate-45';
    default: return 'rounded-full';
  }
}

// ── Scene registry ──────────────────────────────────────────────────
const SCENES: Record<HeroVisualType, React.ComponentType> = {
  'code-editor': CodeEditorScene,
  'terminal': TerminalScene,
  'mobile-device': MobileDeviceScene,
  'dashboard': DashboardScene,
  'globe': GlobeScene,
  'brain-network': BrainNetworkScene,
  'chart-graph': ChartGraphScene,
  'palette-canvas': PaletteCanvasScene,
  'shield-lock': ShieldLockScene,
  'cloud-stack': CloudStackScene,
  'workflow-diagram': WorkflowDiagramScene,
  'data-flow': DataFlowScene,
  'shopping-cart-3d': ShoppingCartScene,
  'megaphone-3d': MegaphoneScene,
  'rocket-launch': RocketLaunchScene,
  'puzzle-pieces': PuzzlePiecesScene,
  'circuit-board': CircuitBoardScene,
  'satellite': SatelliteScene,
  'microscope': MicroscopeScene,
  'lightbulb': LightbulbScene,
  'gear-system': GearSystemScene,
  'network-nodes': NetworkNodesScene,
  'layers-stack': LayersStackScene,
  'target-bullseye': TargetBullseyeScene,
  'chat-bubbles': ChatBubblesScene,
  'server-stack': ServerStackScene,
  'serp-ranking': SerpRankingScene,
  'email-inbox': EmailInboxScene,
  'funnel': FunnelScene,
  'social-feed': SocialFeedScene,
  'kanban-board': KanbanBoardScene,
  'video-player': VideoPlayerScene,
  'database-rings': DatabaseRingsScene,
  'crypto-chain': CryptoChainScene,
  'capability-hub': HomeHeroScene,
  'kpi-cards': KpiCardsScene,
  'gauge-meter': GaugeMeterScene,
  'browser-window': BrowserWindowScene,
  'cms-blocks': CmsBlocksScene,
  'color-swatch': ColorSwatchScene,
  'wireframe': WireframeScene,
  'neural-layers': NeuralLayersScene,
  'product-grid': ProductGridScene,
  'checkout-flow': CheckoutFlowScene,
  'container-grid': ContainerGridScene,
  'app-screens': AppScreensScene,
  'ad-creative': AdCreativeScene,
  'film-strip': FilmStripScene,
  'automation-bot': AutomationBotScene,
};

// ── Main dispatcher (public API unchanged) ──────────────────────────
export function HeroVisual({ type }: { type: HeroVisualType; motionType?: MotionType; accentClass?: string }) {
  const SceneComponent = SCENES[type] ?? NetworkNodesScene;
  return <SceneComponent />;
}
