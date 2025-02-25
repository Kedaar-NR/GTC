
import { motion } from 'framer-motion';
import { ChevronRight, Flag, Vote, BookOpen, Users2, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      title: 'Find Your Representatives',
      description: 'Discover and learn about the elected officials representing your area.',
      icon: Users2,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-blue-500/10 to-blue-900/20',
    },
    {
      title: 'Civic Education',
      description: 'Learn about government processes and how to make your voice heard.',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-red-500/10 to-red-900/20',
    },
    {
      title: 'Stay Informed',
      description: 'Get AI-powered summaries of the latest political news and developments.',
      icon: Newspaper,
      image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-blue-500/10 to-blue-900/20',
    },
    {
      title: 'Take Action',
      description: 'Engage with your community and make a difference in local politics.',
      icon: Vote,
      image: 'https://images.unsplash.com/photo-1617553963287-b117fbb4d25e?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-red-500/10 to-red-900/20',
    },
  ];

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1682685797769-481b48222adf?auto=format&fit=crop&w=1200&q=80',
      alt: 'US Capitol at sunset'
    },
    {
      url: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?auto=format&fit=crop&w=1200&q=80',
      alt: 'American flag'
    },
    {
      url: 'https://images.unsplash.com/photo-1648467837706-b8f4152c1f8b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Liberty statue'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        {/* Hero Section with Image Grid */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Background Image Grid */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-3 gap-4 opacity-10">
              {heroImages.map((image, index) => (
                <div key={index} className="relative h-full">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
          </div>
          
          <div className="text-center space-y-8 relative z-10">            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="inline-block text-blue-600">
                Your Gateway to
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mt-2">
                Civic Engagement
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto text-xl text-gray-600"
            >
              Stay informed, connect with representatives, and make your voice heard in your community.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                Learn More
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="absolute inset-0 -z-10">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-3 rounded-lg bg-white mb-4 shadow-sm">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
