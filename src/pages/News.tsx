
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const NEWS_CATEGORIES = [
  { 
    id: 'technology',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    articles: [
      {
        title: "AI Companies Pledge to Watermark Artificial Content",
        publishedAt: "2024-02-25",
        urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        aiSummary: "Leading tech companies have agreed to implement digital watermarks on AI-generated content to increase transparency and combat misinformation. This industry-wide initiative aims to help users easily distinguish between human-created and AI-generated content.",
        url: "#"
      },
      {
        title: "Quantum Computing Breakthrough in Error Correction",
        publishedAt: "2024-02-24",
        urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
        aiSummary: "Scientists have achieved a significant milestone in quantum computing by developing a more efficient error correction method. This breakthrough could accelerate the development of practical quantum computers.",
        url: "#"
      },
      {
        title: "New Battery Technology Promises Week-Long Phone Life",
        publishedAt: "2024-02-23",
        urlToImage: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
        aiSummary: "Researchers have developed a new type of battery technology that could extend smartphone battery life to over a week. The innovation uses sustainable materials and could revolutionize mobile device usage.",
        url: "#"
      }
    ]
  },
  { 
    id: 'business',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    articles: [
      {
        title: "Global Markets Embrace Sustainable Investing",
        publishedAt: "2024-02-25",
        urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        aiSummary: "Investment in sustainable and ESG-focused funds has reached record levels in 2024. Major financial institutions are rapidly adapting their portfolios to meet growing demand for environmentally conscious investments.",
        url: "#"
      },
      {
        title: "Remote Work Transforms Commercial Real Estate",
        publishedAt: "2024-02-24",
        urlToImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        aiSummary: "The continued prevalence of remote work is causing a significant shift in commercial real estate markets. Companies are downsizing office spaces and reimagining workplace designs.",
        url: "#"
      },
      {
        title: "Small Business Digital Transformation Accelerates",
        publishedAt: "2024-02-23",
        urlToImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
        aiSummary: "Small businesses are rapidly adopting digital technologies to remain competitive. New government initiatives are supporting this transformation through grants and training programs.",
        url: "#"
      }
    ]
  },
  { 
    id: 'politics',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    articles: [
      {
        title: "Global Climate Summit Announces New Agreements",
        publishedAt: "2024-02-25",
        urlToImage: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=800&q=80",
        aiSummary: "World leaders have agreed to more ambitious climate targets at the latest global summit. The new agreement includes stronger emissions reduction commitments and increased funding for renewable energy projects.",
        url: "#"
      },
      {
        title: "Election Reform Bill Gains Bipartisan Support",
        publishedAt: "2024-02-24",
        urlToImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80",
        aiSummary: "A comprehensive election reform bill has received support from both major parties. The legislation aims to modernize voting systems and enhance election security measures.",
        url: "#"
      },
      {
        title: "Infrastructure Package Focuses on Green Technology",
        publishedAt: "2024-02-23",
        urlToImage: "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=800&q=80",
        aiSummary: "A new infrastructure bill prioritizes green technology investments. The package includes funding for electric vehicle charging stations and renewable energy infrastructure.",
        url: "#"
      }
    ]
  },
  { 
    id: 'health',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    articles: [
      {
        title: "Breakthrough in Personalized Medicine Research",
        publishedAt: "2024-02-25",
        urlToImage: "https://images.unsplash.com/photo-1631558556909-578f792591d3?auto=format&fit=crop&w=800&q=80",
        aiSummary: "Scientists have made significant progress in personalized medicine, developing new techniques for tailoring treatments to individual genetic profiles. This advancement could revolutionize cancer treatment approaches.",
        url: "#"
      },
      {
        title: "Mental Health Technology Shows Promising Results",
        publishedAt: "2024-02-24",
        urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        aiSummary: "New digital mental health platforms have demonstrated significant success in clinical trials. These tools combine AI-driven therapy with human supervision to provide accessible mental health support.",
        url: "#"
      },
      {
        title: "Global Health Initiative Targets Preventive Care",
        publishedAt: "2024-02-23",
        urlToImage: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=800&q=80",
        aiSummary: "A new worldwide health initiative focuses on preventive care measures. The program emphasizes early detection and lifestyle changes to reduce chronic disease prevalence.",
        url: "#"
      }
    ]
  }
];

const News = () => {
  const [category, setCategory] = useState('technology');

  const currentCategory = NEWS_CATEGORIES.find(cat => cat.id === category) || NEWS_CATEGORIES[0];
  const articles = currentCategory.articles;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={currentCategory.image}
            alt={category}
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Latest News
            </motion.h1>
            <motion.div 
              className="flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {NEWS_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant="outline"
                  className={`
                    relative border transition-all duration-300
                    ${category === cat.id ? 
                      'bg-gray-900 text-white border-gray-900' : 
                      'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}
                </Button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-gray-100 group">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {article.urlToImage && (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <h4 className="font-semibold mb-2 text-gray-900">AI Summary:</h4>
                    <p className="text-sm text-gray-600">{article.aiSummary}</p>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 text-gray-900 hover:text-gray-700"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    Read Full Article →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
