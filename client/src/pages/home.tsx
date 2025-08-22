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
import { Shield, TrendingUp, Handshake, Loader2 } from "lucide-react";
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

  const form = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const { data: waitlistCount } = useQuery({
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

  return (
    <div className="min-h-screen bg-focara-light font-inter">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating Glass Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 glass-effect rounded-full opacity-30 floating-animation" />
        <div className="absolute bottom-20 right-10 w-24 h-24 glass-effect rounded-full opacity-20 floating-animation animation-delay-4s" />
        <div className="absolute top-1/2 left-20 w-16 h-16 glass-effect rounded-full opacity-25 floating-animation animation-delay-1s" />

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
            <Button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block bg-focara-accent hover:bg-cyan-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              data-testid="button-join-movement"
            >
              Join the Movement
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-focara-dark">
                Our Purpose
              </h2>
              <div className="glass-dark rounded-3xl p-8 md:p-12 text-white">
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  The name is inspired by an Italian village that used signal fires (fuochi) as a beacon to help sailors navigate the coast. Our mission is to provide that same clarity—a powerful tool for those who are serious about breaking free from screen addiction.
                </p>
                <p className="text-lg md:text-xl leading-relaxed">
                  We believe in empowerment over restriction. Our vision is a world where your time and focus are yours to command, enabling you to achieve your goals and live with intention.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-focara-light relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
            alt="Family playing in park" 
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
                A Strong, Serious Approach to <span className="gradient-text">Digital Wellbeing</span>
              </h2>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Column 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-focara-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white text-3xl" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-focara-dark">Wield Your Shield</h3>
              <p className="text-gray-700 leading-relaxed">
                Focara acts as your personal shield. To access a blocked app, you must first solve a brief, maze-based cognitive challenge. This intentional hurdle breaks the habit of mindless tapping, forcing a conscious choice about whether the distraction is truly worth your focus.
              </p>
            </motion.div>
            
            {/* Column 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-focara-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-white text-3xl" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-focara-dark">Gain True Clarity</h3>
              <p className="text-gray-700 leading-relaxed">
                We provide serious, no-nonsense analytics that give you clear insight into your digital habits. Understand your patterns and track your progress without judgment.
              </p>
            </motion.div>
            
            {/* Column 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-focara-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="text-white text-3xl" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-focara-dark">A Tool, Not a Warden</h3>
              <p className="text-gray-700 leading-relaxed">
                Focara is built to be an ally that strengthens your own willpower. We want you to succeed so much that we're happy if you don't need us forever. Use us as a tool to break free from your phone addiction and then move on.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-white relative">
        {/* Background Images */}
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
            alt="People dancing together" 
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
                Be the First to Take Control
              </h2>
              <p className="text-xl mb-12 text-gray-600">
                Join the waitlist to get early access to Focara and begin your journey to reclaiming your focus.
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
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:border-focara-accent focus:ring-2 focus:ring-focara-accent/50 transition-all duration-300"
                        data-testid="input-first-name"
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
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:border-focara-accent focus:ring-2 focus:ring-focara-accent/50 transition-all duration-300"
                        data-testid="input-last-name"
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
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:border-focara-accent focus:ring-2 focus:ring-focara-accent/50 transition-all duration-300"
                      data-testid="input-email"
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
                    className="w-full bg-focara-accent hover:bg-cyan-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-join-waitlist"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      'Join Waitlist'
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
            <div className="flex justify-center space-x-4">
              <div className="glass-effect rounded-xl p-4 opacity-50">
                <svg className="inline w-6 h-6 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 20.5v-17c0-.827.673-1.5 1.5-1.5h15c.827 0 1.5.673 1.5 1.5v17l-9-4-9 4zm9-10.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"/>
                </svg>
                <span className="text-white font-medium">Google Play</span>
              </div>
              <div className="glass-effect rounded-xl p-4 opacity-50">
                <svg className="inline w-6 h-6 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-white font-medium">App Store</span>
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
