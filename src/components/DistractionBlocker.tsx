import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Trash2, Globe, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BlockedSite } from '@/types';

interface DistractionBlockerProps {
  isBlocking: boolean;
  onBlockingChange: (isBlocking: boolean) => void;
  blockedSites: BlockedSite[];
  onBlockedSitesChange: (sites: BlockedSite[]) => void;
  onAddSite: (site: Omit<BlockedSite, 'id' | 'addedAt' | 'userId'>) => Promise<void>;
  onRemoveSite: (siteId: string) => Promise<void>;
}

export const DistractionBlocker: React.FC<DistractionBlockerProps> = ({
  isBlocking,
  onBlockingChange,
  blockedSites,
  onBlockedSitesChange,
  onAddSite,
  onRemoveSite
}) => {
  const [newDomain, setNewDomain] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Social Media');
  const [blockedAttempts, setBlockedAttempts] = useState(0);

  const categories = ['Social Media', 'Entertainment', 'News', 'Shopping', 'Gaming', 'Other'];
  const { toast } = useToast();

  // Simulate blocking attempts during active sessions
  useEffect(() => {
    if (isBlocking) {
      const interval = setInterval(() => {
        // Randomly simulate blocking attempts
        if (Math.random() > 0.7) {
          setBlockedAttempts(prev => prev + 1);
          const randomSite = blockedSites[Math.floor(Math.random() * blockedSites.length)];
          if (randomSite) {
            toast({
              title: "Site Blocked! 🛡️",
              description: `Blocked attempt to visit ${randomSite.domain}`,
              duration: 2000,
            });
          }
        }
      }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds

      return () => clearInterval(interval);
    }
  }, [isBlocking, blockedSites, toast]);

  const addBlockedSite = async () => {
    if (!newDomain.trim()) {
      toast({
        title: "Domain Required",
        description: "Please enter a domain name",
        variant: "destructive"
      });
      return;
    }

    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    const cleanDomain = newDomain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

    if (!domainRegex.test(cleanDomain)) {
      toast({
        title: "Invalid Domain",
        description: "Please enter a valid domain name (e.g., example.com)",
        variant: "destructive"
      });
      return;
    }

    // Check if domain already exists
    if (blockedSites.some(site => site.domain === cleanDomain)) {
      toast({
        title: "Domain Already Blocked",
        description: "This domain is already in your blocklist",
        variant: "destructive"
      });
      return;
    }

    await onAddSite({
      domain: cleanDomain,
      category: selectedCategory
    });

    setNewDomain('');
    
    toast({
      title: "Domain Added! 🚫",
      description: `${cleanDomain} has been added to your blocklist`,
    });
  };

  const removeBlockedSite = async (id: string) => {
    const site = blockedSites.find(s => s.id === id);
    await onRemoveSite(id);
    
    if (site) {
      toast({
        title: "Domain Removed",
        description: `${site.domain} has been removed from your blocklist`,
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Social Media': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Entertainment': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'News': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Shopping': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Gaming': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Other': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[category as keyof typeof colors] || colors.Other;
  };

  return (
    <div className="space-y-6">
      {/* Blocking Status */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className={`w-6 h-6 ${isBlocking ? 'text-green-400' : 'text-gray-400'}`} />
              <span className="text-xl font-bold text-white">Distraction Blocker</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isBlocking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className={`text-sm font-medium ${isBlocking ? 'text-green-700' : 'text-slate-700'}`}>
                  {isBlocking ? 'Active' : 'Inactive'}
                </span>
              </div>
              <Button
                onClick={() => onBlockingChange(!isBlocking)}
                variant={isBlocking ? "destructive" : "default"}
                size="sm"
                className={isBlocking ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
              >
                {isBlocking ? 'Stop Blocking' : 'Start Blocking'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isBlocking && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-700 font-medium">Blocking is currently active</p>
                  <p className="text-green-600 text-sm">
                    {blockedSites.length} sites blocked • {blockedAttempts} attempts blocked this session
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-slate-800">{blockedSites.length}</div>
              <div className="text-sm text-slate-600">Sites Blocked</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-700">{blockedAttempts}</div>
              <div className="text-sm text-slate-600">Attempts Blocked</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-700">{categories.length}</div>
              <div className="text-sm text-slate-600">Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Site */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Add Website to Block</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                placeholder="Enter domain (e.g., example.com)"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addBlockedSite()}
                className="bg-white/10 border-white/20 text-slate-800 placeholder-slate-400"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-slate-800"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
            <Button
              onClick={addBlockedSite}
              className="bg-purple-600 hover:bg-purple-700 px-4"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Blocked Sites List */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Blocked Websites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {blockedSites.map((site) => (
              <div
                key={site.id}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-slate-800">{site.domain}</p>
                    <p className="text-sm text-slate-500">
                      Added {site.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${getCategoryColor(site.category)} border`}>
                    {site.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBlockedSite(site.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {blockedSites.length === 0 && (
            <div className="text-center py-8">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-slate-600">No websites blocked yet</p>
              <p className="text-sm text-slate-500">Add domains above to start blocking distractions</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Blocked by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map(category => {
              const count = blockedSites.filter(site => site.category === category).length;
              return (
                <div key={category} className="bg-white/5 rounded-lg p-3 text-center">
                  <Badge className={`${getCategoryColor(category)} border mb-2`}>
                    {category}
                  </Badge>
                  <div className="text-lg font-bold text-slate-800">{count}</div>
                  <div className="text-xs text-slate-500">sites</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
