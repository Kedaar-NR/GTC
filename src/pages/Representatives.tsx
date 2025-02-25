
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Flag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PRELOADED_REPRESENTATIVES = [
  {
    name: "Donald J. Trump",
    office: "President of the United States",
    party: "Republican",
    photoUrl: "",  // Removed photo URL since we'll use the flag icon instead
    phones: ["(202) 456-1111"],
    emails: ["president@whitehouse.gov"],
    aiSummary: "President Trump's administration priorities include:\n• America First foreign policy\n• Border security and immigration reform\n• Economic growth and deregulation\n• Trade agreement renegotiation\n• Energy independence initiatives",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    rank: 1
  },
  {
    name: "Gavin Newsom",
    office: "Governor of California",
    party: "Democratic",
    photoUrl: "/lovable-uploads/1456cfc8-7781-40a1-b211-c2336e42e8a9.png",
    phones: ["(916) 445-2841"],
    emails: ["governor@governor.ca.gov"],
    aiSummary: "Governor Newsom's administration priorities include:\n• Housing affordability and homelessness solutions\n• Climate change and environmental protection\n• Healthcare access and pandemic management\n• Education funding and reform\n• Economic innovation and job growth",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    rank: 2
  },
  {
    name: "Adam Schiff",
    office: "U.S. Senator",
    party: "Democratic",
    photoUrl: "/lovable-uploads/eefd3a55-5271-4b34-942b-b4dd434ec844.png",
    phones: ["(202) 224-3553"],
    emails: ["senator@schiff.senate.gov"],
    aiSummary: "Senator Schiff's priorities include:\n• National security and intelligence oversight\n• Healthcare access and affordability\n• Environmental protection\n• Civil rights and voting rights\n• Economic opportunity for all Americans",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    rank: 3
  },
  {
    name: "Alex Padilla",
    office: "U.S. Senator",
    party: "Democratic",
    photoUrl: "/lovable-uploads/1f804c3e-008d-4fe1-95b3-a04c22150513.png",
    phones: ["(202) 224-3553"],
    emails: ["senator@padilla.senate.gov"],
    aiSummary: "Senator Padilla's priorities include:\n• Immigration reform and pathway to citizenship\n• Climate action and environmental justice\n• Infrastructure development\n• Voting rights protection\n• California tech industry growth",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    rank: 4
  },
  {
    name: "Ro Khanna",
    office: "U.S. Representative",
    party: "Democratic",
    photoUrl: "/lovable-uploads/95f891b3-165d-4fff-bcb5-740269947da5.png",
    phones: ["(202) 225-2631"],
    emails: ["ca17.public@mail.house.gov"],
    aiSummary: "Representative Khanna's priorities include:\n• Technology and innovation policy\n• Economic opportunity and jobs\n• Progressive foreign policy\n• Environmental protection\n• Silicon Valley representation",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    rank: 5
  },
  {
    name: "Otto Lee",
    office: "County Supervisor",
    party: "Democratic",
    photoUrl: "/lovable-uploads/92463dc0-4324-4fc0-844f-ad8ededdaae3.png",
    phones: ["(408) 299-5030"],
    emails: ["supervisor.lee@bos.sccgov.org"],
    aiSummary: "Supervisor Lee's local priorities include:\n• Housing affordability initiatives\n• Public transportation improvement\n• Community services enhancement\n• Environmental sustainability\n• Small business support in Santa Clara County",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    rank: 6
  }
];

const Representatives = () => {
  const [address, setAddress] = useState('95051');
  const { toast } = useToast();

  const { data: representatives, isLoading, refetch } = useQuery({
    queryKey: ['representatives', address],
    queryFn: async () => {
      if (!address) return PRELOADED_REPRESENTATIVES;
      try {
        const { data, error } = await supabase.functions.invoke('get-representatives', {
          body: { address },
        });
        if (error) throw error;
        return data || PRELOADED_REPRESENTATIVES;
      } catch (error) {
        console.error('Error fetching representatives:', error);
        return PRELOADED_REPRESENTATIVES;
      }
    },
    initialData: PRELOADED_REPRESENTATIVES
  });

  const sortedRepresentatives = [...representatives].sort((a, b) => a.rank - b.rank);

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Find Your Representatives</h1>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!address) {
          toast({
            title: "Error",
            description: "Please enter an address",
            variant: "destructive",
          });
          return;
        }
        refetch();
      }} className="max-w-xl mx-auto mb-12 space-y-4">
        <Input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</> : 'Find Representatives'}
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedRepresentatives.map((rep: any, index: number) => (
          <Card 
            key={index} 
            className={`h-full ${rep.bgColor} border ${rep.borderColor} transition-all duration-300 hover:shadow-lg`}
          >
            <CardHeader>
              <CardTitle className={`text-xl ${rep.textColor}`}>{rep.name}</CardTitle>
              <CardDescription>{rep.office}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rep.name === "Donald J. Trump" ? (
                <div className="flex justify-center">
                  <Flag size={64} className="text-blue-600" />
                </div>
              ) : rep.photoUrl && (
                <div className="flex justify-center">
                  <img
                    src={rep.photoUrl}
                    alt={rep.name}
                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-200"
                  />
                </div>
              )}
              <div className="space-y-2">
                <p className={`text-sm font-semibold ${rep.textColor}`}>
                  Party: {rep.party}
                </p>
                {rep.phones?.[0] && (
                  <p className="text-sm">
                    <span className="font-semibold">Phone:</span> {rep.phones[0]}
                  </p>
                )}
                {rep.emails?.[0] && (
                  <p className="text-sm">
                    <span className="font-semibold">Email:</span> {rep.emails[0]}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">AI Summary:</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">{rep.aiSummary}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Representatives;
