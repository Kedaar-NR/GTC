
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const MODULES = [
  {
    id: 1,
    title: 'Introduction to Government',
    description: 'Learn about the basic structure of government and how it works',
    lessons: [
      'The Three Branches of Government',
      'Federal vs State Powers',
      'The Constitution and Bill of Rights',
    ],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Electoral Process',
    description: 'Understanding elections and voting rights',
    lessons: [
      'Voter Registration',
      'Electoral College',
      'Primary vs General Elections',
    ],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Policy Making',
    description: 'How laws and policies are created and implemented',
    lessons: [
      'Legislative Process',
      'Executive Orders',
      'Judicial Review',
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Civic Engagement',
    description: 'Ways to participate in democracy',
    lessons: [
      'Community Involvement',
      'Advocacy and Activism',
      'Public Comment Process',
    ],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
  },
];

const Education = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, number>>({});

  const handleStartModule = (moduleId: number) => {
    setActiveModule(moduleId);
    if (!progress[moduleId]) {
      setProgress(prev => ({ ...prev, [moduleId]: 0 }));
    }
  };

  const handleCompleteLesson = (moduleId: number) => {
    const currentProgress = progress[moduleId] || 0;
    const moduleData = MODULES.find(m => m.id === moduleId);
    const totalLessons = moduleData?.lessons.length || 1;
    const newProgress = Math.min(currentProgress + (100 / totalLessons), 100);
    
    setProgress(prev => ({
      ...prev,
      [moduleId]: newProgress,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1 
              className="text-6xl sm:text-7xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master Civic Knowledge
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Embark on an exciting journey through the foundations of democracy. 
              Each module brings you closer to becoming an engaged citizen.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MODULES.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-gray-100">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">{module.title}</CardTitle>
                  <CardDescription className="text-gray-600">{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {progress[module.id] > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{Math.round(progress[module.id])}%</span>
                      </div>
                      <Progress 
                        value={progress[module.id]} 
                        className="h-2 bg-gray-100"
                      />
                    </div>
                  )}
                  
                  {activeModule === module.id ? (
                    <div className="space-y-4">
                      {module.lessons.map((lesson, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                        >
                          <span className="text-sm text-gray-900">{lesson}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleCompleteLesson(module.id)}
                            disabled={progress[module.id] >= ((index + 1) * (100 / module.lessons.length))}
                          >
                            {progress[module.id] >= ((index + 1) * (100 / module.lessons.length))
                              ? '✓ Completed'
                              : 'Complete'}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={() => handleStartModule(module.id)}
                    >
                      {progress[module.id] ? 'Continue Module' : 'Start Module'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
