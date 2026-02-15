import React from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import Carousel from '@/components/Carousel';
import PricingSection from '@/components/PricingSection';
import { motion } from 'framer-motion';

/**
 * pages/index.tsx - Home/Landing Page
 * Main entry point showcasing the platform
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>RoboxGen - AI Roblox Game Generator</title>
        <meta
          name="description"
          content="Generate Roblox games with AI. Describe your game idea and get instant Lua scripts and game files."
        />
        <meta property="og:title" content="RoboxGen - Make Any Roblox Game in Seconds" />
        <meta
          property="og:description"
          content="AI-powered Roblox game generator. Type your idea, download the files, play instantly."
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <Hero />

      {/* Carousel Section */}
      <Carousel />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-secondary/10"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-5xl font-black leading-tight">
              Ready to Make Your First Game?
            </h2>
            <p className="text-xl text-white/70">
              Join 10,000+ creators who've turned their ideas into Roblox games using RoboxGen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="/generate">
                <button className="btn btn-primary w-full sm:w-auto">
                  Start Creating →
                </button>
              </a>
              <button className="btn btn-secondary w-full sm:w-auto">
                Watch Tutorial
              </button>
            </div>

            <p className="text-sm text-white/50">
              ✨ Free tier includes 1 game per day • No credit card required
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
