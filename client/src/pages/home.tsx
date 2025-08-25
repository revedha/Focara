import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertWaitlistRegistrationSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, TrendingUp, Handshake, Loader2, Palette, Target, Crown, Brain, Lock, Microscope, DollarSign, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

type WaitlistForm = {
  firstName: string;
  lastName: string;
  email: string;
};

const waitlistSchema = insertWaitlistRegistrationSchema.extend({
  firstName: insertWaitlistRegistrationSchema.shape.firstName.min(1, "First name is required"),
  lastName: insertWaitlistRegistrationSchema.shape.lastName.min(1, "Last name is required"),
  email: insertWaitlistRegistrationSchema.shape.email.email("Please enter a valid email address"),
});

export default function Home() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');

  const form = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const { data: waitlistCount } = useQuery<{ count: number }>({
    queryKey: ["/api/waitlist/count"],
  });

  const mutation = useMutation({
    mutationFn: async (data: WaitlistForm) => {
      return apiRequest("POST", "/api/waitlist", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Welcome to the waitlist!",
        description: "Thank you for joining. We'll be in touch soon.",
      });
      // Invalidate and refetch waitlist count
      queryClient.invalidateQueries({ queryKey: ["/api/waitlist/count"] });
    },
    onError: (error: any) => {
      const message = error.message || "Something went wrong. Please try again.";
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    },
  });

  const onSubmit = (data: WaitlistForm) => {
    mutation.mutate(data);
  };

  const themes = [
    { name: 'Default', value: 'default', colors: ['#0891b2', '#f97316'] },
    { name: 'Warm', value: 'warm', colors: ['#ea580c', '#eab308'] },
    { name: 'Ocean', value: 'ocean', colors: ['#0369a1', '#2563eb'] },
    { name: 'Forest', value: 'forest', colors: ['#059669', '#65a30d'] },
    { name: 'Sunset', value: 'sunset', colors: ['#e11d48', '#ea580c'] }
  ];

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    if (theme !== 'default') {
      body.classList.add(`theme-${theme}`);
    }
  };

  return (
    <div className="min-h-screen bg-focara-light font-inter">
      {/* Theme Selector */}
      <div className="fixed top-4 right-4 z-50">
        <div className="glass-effect rounded-full p-2">
          <select 
            value={currentTheme} 
            onChange={(e) => handleThemeChange(e.target.value)}
            className="bg-transparent text-white text-xs border-none outline-none cursor-pointer"
            data-testid="theme-selector"
          >
            {themes.map(theme => (
              <option key={theme.value} value={theme.value} className="bg-gray-800 text-white">
                {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating Glass Elements with Fire Effects */}
        <div className="absolute top-20 left-10 w-32 h-32 glass-effect rounded-full opacity-30 floating-animation fire-glow" />
        <div className="absolute bottom-20 right-10 w-24 h-24 glass-effect rounded-full opacity-20 floating-animation animation-delay-4s fire-glow" />
        <div className="absolute top-1/2 left-20 w-16 h-16 glass-effect rounded-full opacity-25 floating-animation animation-delay-1s fire-glow" />
        
        {/* Fire Particles */}
        <div className="fire-particle" style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
        <div className="fire-particle" style={{ top: '60%', right: '15%', animationDelay: '1s' }}></div>
        <div className="fire-particle" style={{ top: '80%', left: '25%', animationDelay: '2s' }}></div>
        <div className="fire-particle" style={{ top: '40%', right: '30%', animationDelay: '0.5s' }}></div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-3xl p-8 md:p-12 max-w-4xl mx-auto floating-animation"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Focara: Your beacon back to <span className="gradient-text">real life</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
              In a world designed to capture your attention, Focara is your guide. We believe in empowerment over restriction, giving you the tools to command your time and focus.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                data-testid="button-join-movement"
              >
                Join the Movement
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="py-20 purpose-gradient relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Our Purpose
              </h2>
              <div className="glass-inspirational rounded-3xl p-8 md:p-12 text-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-15 animate-pulse delay-1000"></div>
                </div>
                <div className="relative z-10">
                  <p className="text-lg md:text-xl leading-relaxed mb-6 font-medium">
                    The name is inspired by an Italian village that used signal fires (fuochi) as a beacon to help sailors navigate the coast. Our mission is to provide that same clarity—a powerful tool for those who are serious about breaking free from screen addiction.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed font-medium">
                    We believe in empowerment over restriction. Our vision is a world where your time and focus are yours to command, enabling you to achieve your goals and live with intention.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 how-it-works-bg relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-15 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
            alt="Family playing in park" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute bottom-10 left-10 w-48 h-48 opacity-10 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1551887373-6edba6dacbb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
            alt="People dancing outdoors" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-focara-dark">
                A Strong, Serious Approach to <span className="gradient-text-blue">Digital Wellbeing</span>
              </h2>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {/* Column 1: Designed to Be Deleted */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300 border-2 border-orange-200/30"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-focara-dark">Designed For Your Success</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Our goal is your graduation. We help you build habits so strong that you no longer need us. When you're ready to break free and move on, we'll be the first to celebrate your success.
              </p>
            </motion.div>
            
            {/* Column 2: Mindful Friction */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300 border-2 border-orange-200/30"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-focara-dark">Mindful Friction, Not Mindless Blocking</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Instead of a frustrating wall, Focara presents a brief, engaging challenge—like a maze or logic puzzle. This moment of mindful friction breaks the habit of mindless scrolling, empowering you to make a conscious choice.
              </p>
            </motion.div>
            
            {/* Column 3: Empowerment Through Control */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300 border-2 border-orange-200/30"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-focara-dark">Empowerment Through Control</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Modern apps are designed to capture your attention; Focara is designed to give it back. Every time you pause, the decision is yours. You are the master of your device, not the other way around.
              </p>
            </motion.div>
            
            {/* Column 4: Science-Backed Habit Formation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300 border-2 border-orange-200/30"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-focara-dark">Science-Backed Habit Formation</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                We handle the science so you can build the habit. Focara uses proven principles of behavioral psychology to help you gently rewire neural pathways and build a healthier relationship with technology.
              </p>
            </motion.div>
            
            {/* Column 5: Absolute Simplicity & Privacy */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300 border-2 border-orange-200/30"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-focara-dark">Absolute Simplicity & Privacy</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                No nonsense. No tracking. Focara has one job: to help you focus. Your progress is for your eyes only. We respect your privacy completely by design, never using invasive analytics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grounded in Science Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Microscope className="text-white" size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-focara-dark">
                Grounded in Science, Designed for Results
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Focara is built on proven principles of behavioral psychology. We disrupt the brain's "Habit Loop" (Cue → Routine → Reward) by introducing 'Cognitive Friction'—a positive interruption that forces a moment of intentional thought. This scientifically-backed method helps weaken old neural pathways and build new, healthier ones.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing & Philosophy Section */}
      <section className="py-20 how-it-works-bg relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-focara-dark">
                A Model That Puts You First
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                We succeed when you no longer need us. That's why we reject recurring subscriptions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* 3-Month Plan */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-effect rounded-3xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300 border-2 border-orange-200/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-focara-dark">3-Month Focus Pass</h3>
                <div className="text-4xl font-bold text-orange-600 mb-4">$19.99</div>
                <p className="text-gray-700 leading-relaxed">
                  A one-time payment for a dedicated, short-term transformation.
                </p>
              </motion.div>

              {/* 6-Month Plan */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass-effect rounded-3xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300 border-2 border-orange-200/30 relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Crown className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-focara-dark">6-Month Habit-Building Pass</h3>
                <div className="text-4xl font-bold text-orange-600 mb-4">$29.99</div>
                <p className="text-gray-700 leading-relaxed">
                  A one-time payment to solidify your new habits for life.
                </p>
              </motion.div>
            </div>

            {/* Trust Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold text-lg">
                <CheckCircle size={24} />
                <span>This is a one-time purchase, not a subscription.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 how-it-works-bg relative">
        {/* Background Images */}
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-8 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
            alt="People dancing together" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute top-0 right-0 w-56 h-56 opacity-6 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
            alt="Children playing soccer in park" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-focara-dark">
                Ready to Reclaim Your Focus?
              </h2>
              <p className="text-xl mb-12 text-gray-600">
                Join the early access list to be the first to get Focara and lock in a 50% founder's discount.
              </p>
              
              {waitlistCount && (
                <p className="text-sm text-gray-500 mb-4" data-testid="text-waitlist-count">
                  {waitlistCount.count} people have already joined
                </p>
              )}
            </motion.div>
            
            <div className="glass-dark rounded-3xl p-8 md:p-12">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center text-white"
                  data-testid="success-message"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Thank you!</h3>
                  <p className="text-lg">You've been added to our waitlist. We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="sr-only">First Name</Label>
                      <Input
                        {...form.register("firstName")}
                        id="firstName"
                        placeholder="First Name"
                        className="waitlist-input w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-gray-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
                        data-testid="input-first-name"
                        style={{ color: 'black', WebkitTextFillColor: 'black' }}
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-400 text-sm mt-1" data-testid="error-first-name">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="sr-only">Last Name</Label>
                      <Input
                        {...form.register("lastName")}
                        id="lastName"
                        placeholder="Last Name"
                        className="waitlist-input w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-gray-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
                        data-testid="input-last-name"
                        style={{ color: 'black', WebkitTextFillColor: 'black' }}
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-400 text-sm mt-1" data-testid="error-last-name">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="sr-only">Email Address</Label>
                    <Input
                      {...form.register("email")}
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="waitlist-input w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-gray-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
                      data-testid="input-email"
                      style={{ color: 'white', WebkitTextFillColor: 'white' }}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1" data-testid="error-email">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-join-waitlist"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      'Request Early Access & Lock In My Discount'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-focara-dark py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Download Coming Soon</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="glass-effect rounded-xl py-3 px-6 opacity-60 hover:opacity-80 transition-opacity cursor-pointer">
                <div className="flex items-center space-x-3">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <span className="text-white font-medium text-sm">Google Play</span>
                </div>
              </div>
              <div className="glass-effect rounded-xl py-3 px-6 opacity-60 hover:opacity-80 transition-opacity cursor-pointer">
                <div className="flex items-center space-x-3">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                  <span className="text-white font-medium text-sm">App Store</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mt-2">Coming soon...</p>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 mb-2">Apex Meridian Private Limited</p>
            <p className="text-gray-500 text-sm">© 2025 Focara. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
