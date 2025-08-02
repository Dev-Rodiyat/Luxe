import { useState, useEffect } from 'react';
import {
  Heart, Shield, Leaf, Globe, Star, ArrowRight, CheckCircle,
  Users, Award, Sparkles
} from 'lucide-react';
import Layout from '../layouts/Layout';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Passion for Craft",
      description: "Every piece is created with meticulous attention to detail and genuine love for the art of fashion."
    },
    {
      icon: Leaf,
      title: "Sustainable Future",
      description: "We're committed to eco-friendly practices, from sourcing to packaging, protecting our planet for future generations."
    },
    {
      icon: Shield,
      title: "Ethical Standards",
      description: "Fair wages, safe working conditions, and ethical partnerships are non-negotiable in our supply chain."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connecting fashion lovers worldwide through shared values of quality, style, and conscious consumption."
    }
  ];

  const milestones = [
    { year: "2015", event: "Founded with a vision to revolutionize luxury fashion" },
    { year: "2017", event: "Opened first flagship store in New York" },
    { year: "2019", event: "Launched sustainable collection using recycled materials" },
    { year: "2021", event: "Reached 1 million happy customers worldwide" },
    { year: "2023", event: "Achieved carbon-neutral shipping globally" },
    { year: "2025", event: "Expanding to 50+ countries with local partnerships" }
  ];

  const stats = [
    { number: "2M+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Countries Served", icon: Globe },
    { number: "4.9★", label: "Average Rating", icon: Star },
    { number: "10+", label: "Years of Excellence", icon: Award }
  ];

  const teamMembers = [
    {
      name: "Emma Richardson",
      role: "Founder & Creative Director",
      image: "👩‍🎨",
      bio: "Visionary designer with 15+ years in luxury fashion"
    },
    {
      name: "Marcus Chen",
      role: "Head of Sustainability",
      image: "👨‍💼",
      bio: "Leading our mission for ethical and eco-friendly practices"
    },
    {
      name: "Sofia Rodriguez",
      role: "Master Craftsperson",
      image: "👩‍🔬",
      bio: "Expert artisan ensuring every piece meets our quality standards"
    },
    {
      name: "James Williams",
      role: "Global Operations",
      image: "👨‍💻",
      bio: "Connecting our brand with customers worldwide"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative pt-20 min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-500/10"></div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-300"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Our Story</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Crafting Dreams
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Into Reality</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                For over a decade, Luxe has been at the forefront of luxury fashion,
                combining timeless elegance with modern innovation to create pieces
                that don't just follow trends—they set them.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Our Collection</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                  Download Lookbook
                </button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                <div className="text-8xl opacity-30">✨</div>
                <div className="absolute inset-4 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">👗</div>
                    <div className="text-2xl font-bold">Since 2015</div>
                    <div className="text-lg opacity-80">Defining Luxury</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">The Luxe Story</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                What began as a small dream in a New York studio has evolved into a global movement,
                redefining what luxury fashion means in the modern world.
              </p>
            </div>

            <div className="prose prose-lg mx-auto dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Beginning</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    Founded in 2015 by visionary designer Emma Richardson, Luxe emerged from a simple yet
                    powerful belief: that luxury should not come at the expense of ethics or sustainability.
                    Emma, having worked with several high-end fashion houses, witnessed firsthand the industry's
                    challenges and knew there had to be a better way.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Starting with just three pieces in a small studio apartment, Luxe quickly gained recognition
                    for its commitment to exceptional craftsmanship and responsible practices.
                  </p>
                </div>
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl opacity-60">🏢</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="md:order-2">
                  <h3 className="text-2xl font-bold mb-6">Our Growth</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    Each garment told a story—not just of style, but of the skilled artisans who created it
                    and the sustainable materials from which it was born. Word spread quickly about this
                    revolutionary approach to luxury fashion.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Today, Luxe stands as a testament to what's possible when passion meets purpose. We've grown
                    from that humble studio to serve customers in over 50 countries, but our core values remain
                    unchanged: exceptional quality, ethical practices, and a relentless pursuit of beauty.
                  </p>
                </div>
                <div className="relative md:order-1">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl opacity-60">🌍</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <div key={idx} className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                The passionate people behind Luxe
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center">
                    <div className="text-6xl">{member.image}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Key milestones that shaped our story
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-pink-600"></div>

              <div className="space-y-12">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center z-10">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                      }`}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="text-2xl font-bold text-purple-600 mb-2">
                          {milestone.year}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Commitment to Sustainability</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Fashion that cares for people and planet
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Eco-Friendly Materials</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We source sustainable fabrics including organic cotton, recycled polyester, and innovative bio-materials.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Carbon Neutral Shipping</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All our shipments are carbon neutral through verified offset programs and sustainable packaging.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Ethical Production</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fair wages, safe working conditions, and long-term partnerships with certified suppliers worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Join Our Journey</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Be Part of the
              <br />
              <span className="text-yellow-300">Luxe Experience</span>
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Discover fashion that tells your story. Join millions who trust Luxe
              for timeless elegance and conscious luxury.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Explore Collections
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                Visit Our Stores
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}