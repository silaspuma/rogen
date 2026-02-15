import React from 'react';

/**
 * Pricing Section Component - HACKER/TERMINAL THEME
 * Displays free and premium tiers
 */
const PricingSection: React.FC = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        '[1] game generation per day',
        '[basic] game types',
        '[5] visual themes',
        '[community] support',
        '[basic] lua_scripts',
      ],
      cta: '$ GET_STARTED',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '9.99',
      description: 'For serious creators',
      features: [
        '[✓] unlimited_generations',
        '[✓] all_game_types',
        '[✓] 20+_visual_themes',
        '[✓] priority_email_support',
        '[✓] advanced_lua_features',
        '[✓] custom_asset_packs',
        '[✓] export_multiple_formats',
        '[✓] analytics_dashboard',
      ],
      cta: '$ START_FREE_TRIAL',
      highlighted: true,
    },
    {
      name: 'Studio',
      price: '49.99',
      description: 'For game development studios',
      features: [
        '[✓] everything_in_pro',
        '[✓] team_collaboration',
        '[✓] unlimited_team_members',
        '[✓] 24/7_phone_support',
        '[✓] custom_ai_training',
        '[✓] white_label_option',
        '[✓] api_access',
        '[✓] dedicated_account_manager',
      ],
      cta: '$ CONTACT_SALES',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 overflow-hidden font-mono">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-magenta/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 uppercase text-neon-green" style={{
            textShadow: '0 0 20px rgba(0, 255, 0, 0.6)',
          }}>
            Simple, <span style={{ color: '#00ffff', textShadow: '0 0 20px rgba(0, 255, 255, 0.6)' }}>Transparent</span> Pricing
          </h2>
          <p className="text-base text-neon-green opacity-80 max-w-2xl mx-auto">
            $ choose_plan && access_ai_generation_features
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`terminal-box border-2 p-8 transition-all ${
                tier.highlighted
                  ? 'border-neon-magenta md:scale-105'
                  : 'border-neon-green hover:border-neon-cyan'
              }`}
              style={{
                boxShadow: tier.highlighted 
                  ? '0 0 20px rgba(255, 0, 255, 0.4)' 
                  : '0 0 15px rgba(0, 255, 0, 0.3)',
              }}
            >
              {/* Recommended Badge */}
              {tier.highlighted && (
                <div className="inline-block px-3 py-1 bg-terminal-bg text-neon-magenta border-2 border-neon-magenta text-xs font-bold mb-4 uppercase" style={{
                  boxShadow: '0 0 10px rgba(255, 0, 255, 0.5)',
                }}>
                  [★ MOST_POPULAR]
                </div>
              )}

              {/* Title & Price */}
              <h3 className="text-2xl font-bold mb-2 text-neon-cyan uppercase">[{tier.name}]</h3>
              <p className="text-neon-green text-xs mb-4 opacity-70">{tier.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-black text-neon-magenta" style={{
                  textShadow: '0 0 10px rgba(255, 0, 255, 0.6)',
                }}>${tier.price}</span>
                <span className="text-neon-green opacity-70 ml-2 text-xs">/month</span>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-2 font-bold uppercase text-xs mb-8 border-2 transition-all ${
                  tier.highlighted
                    ? 'border-neon-magenta text-neon-magenta bg-terminal-bg hover:border-neon-cyan hover:text-neon-cyan'
                    : 'border-neon-green text-neon-green bg-terminal-bg hover:border-neon-cyan hover:text-neon-cyan'
                }`}
                style={{
                  boxShadow: tier.highlighted
                    ? '0 0 10px rgba(255, 0, 255, 0.4)'
                    : '0 0 10px rgba(0, 255, 0, 0.3)',
                }}
              >
                {tier.cta}
              </button>

              {/* Features List */}
              <div className="space-y-3">
                {tier.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-start gap-3">
                    <span className="text-neon-magenta font-bold">$</span>
                    <span className="text-xs text-neon-green opacity-80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-neon-green opacity-80 mb-4 text-sm">
            $ uncertain_about_plan? <a href="#" className="text-neon-cyan hover:text-neon-magenta font-bold">
              [CONTACT_US]
            </a>
          </p>
          <p className="text-xs text-neon-green opacity-50">
            $ all_plans: free_trial_7_days • no_credit_card_required
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
