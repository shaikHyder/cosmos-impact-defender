import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Starfield from '@/components/Starfield';
import { Zap, Globe, BookOpen, Shield, Target, Orbit } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Starfield />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent animate-float">
            Asteroid Impact
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-stellar bg-clip-text text-transparent">
            Simulator & Explorer
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Explore the cosmos, simulate asteroid impacts, and understand the forces that shape our solar system.
            Experience real-world physics and discover how we can defend our planet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cosmic" size="lg" asChild>
              <Link to="/simulator" className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Start Simulation</span>
              </Link>
            </Button>
            <Button variant="stellar" size="lg" asChild>
              <Link to="/solar-system" className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Explore Solar System</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Discover the Power of Cosmic Simulation
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="cosmic-glow border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-primary" />
                  <span>Impact Simulation</span>
                </CardTitle>
                <CardDescription>
                  Calculate real asteroid impacts with precise physics modeling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adjust asteroid size, velocity, and trajectory to see devastating or minimal impacts.
                  Understand crater formation and damage zones.
                </p>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Orbit className="w-6 h-6 text-accent" />
                  <span>3D Solar System</span>
                </CardTitle>
                <CardDescription>
                  Explore our solar system in stunning 3D detail
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Navigate through space, examine planets, and trace asteroid paths 
                  through our cosmic neighborhood.
                </p>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-stellar-500" />
                  <span>Planetary Defense</span>
                </CardTitle>
                <CardDescription>
                  Learn about asteroid deflection technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discover how delta-v maneuvers and deflection missions could 
                  protect Earth from potential asteroid threats.
                </p>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-destructive" />
                  <span>Educational Content</span>
                </CardTitle>
                <CardDescription>
                  Deep dive into asteroid science and space physics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn about famous impacts, crater formation, and the science 
                  behind asteroid detection and tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <span>Real Physics</span>
                </CardTitle>
                <CardDescription>
                  Accurate simulations based on scientific research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All calculations use real physics equations and data from 
                  NASA and scientific research institutions.
                </p>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-6 h-6 text-accent" />
                  <span>Interactive Learning</span>
                </CardTitle>
                <CardDescription>
                  Hands-on exploration of cosmic phenomena
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experiment with different scenarios and see immediate results.
                  Perfect for students, educators, and space enthusiasts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-card/50 to-secondary/30 border-primary/30">
            <CardContent className="pt-8">
              <h3 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
                Ready to Explore the Cosmos?
              </h3>
              <p className="text-xl text-muted-foreground mb-8">
                Start your journey into asteroid science and planetary defense. 
                Discover how we can protect our planet from cosmic threats.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cosmic" size="lg" asChild>
                  <Link to="/simulator">Begin Simulation</Link>
                </Button>
                <Button variant="nebula" size="lg" asChild>
                  <Link to="/education">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;