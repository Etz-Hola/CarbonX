import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, TrendingUp, Shield, Globe, Users, Award } from 'lucide-react';
import Button from '../components/common/Button';
import { formatLargeNumber } from '../utils/format';

const Landing: React.FC = () => {
  const stats = [
    { label: 'Total Carbon Offset', value: '1.2M', unit: 'tons CO₂' },
    { label: 'Active Users', value: '25K', unit: 'traders' },
    { label: 'Credits Traded', value: '500K', unit: 'fractions' },
    { label: 'Yield Distributed', value: '$2.1M', unit: 'rewards' },
  ];

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: 'Fractionalized Trading',
      description: 'Trade carbon credits in affordable fractions, making green investing accessible to everyone.',
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Verified Impact',
      description: 'Every credit is backed by real-world data from satellites and IoT sensors.',
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: 'Earn Rewards',
      description: 'Stake your credits to earn dynamic yield based on actual carbon sequestration.',
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: 'Global Access',
      description: 'Buy with local currencies through fiat on-ramps or use crypto wallets.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Environmental Advocate',
      content: 'CarbonX made it possible for me to invest in carbon credits with just $50. The impact tracking is incredible!',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Marcus Chen',
      role: 'Sustainability Manager',
      content: 'Our company uses CarbonX for transparent carbon offsetting. The ZK-proofs ensure our compliance stays private.',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Elena Rodriguez',
      role: 'DeFi Investor',
      content: 'The yield farming rewards tied to real forest growth is genius. I\'m earning while helping the planet.',
      avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trade Carbon Credits,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Save the Planet
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join the world's first fractionalized carbon credit trading platform. 
              Invest in verified environmental projects, earn rewards, and make a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => window.location.href = '/trade'}
              >
                Start Trading
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/impact'}
              >
                View Impact
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.unit}</div>
                <div className="text-lg font-medium text-gray-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose CarbonX?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing carbon markets with blockchain technology, 
              making green investing accessible, transparent, and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Connect Wallet
              </h3>
              <p className="text-gray-400">
                Link your crypto wallet or use our custodial solution for fiat purchases
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Buy Credits
              </h3>
              <p className="text-gray-400">
                Trade fractionalized carbon credits from verified environmental projects
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Earn Rewards
              </h3>
              <p className="text-gray-400">
                Stake your credits to earn yield based on real-world carbon sequestration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who are already making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join the carbon credit revolution and start earning rewards while saving the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => window.location.href = '/trade'}
            >
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
              onClick={() => window.location.href = '/leaderboard'}
            >
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;