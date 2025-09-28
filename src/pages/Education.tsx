import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Starfield from '@/components/Starfield';
import { BookOpen, Zap, Target, Shield, Telescope, AlertTriangle } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 relative">
      <Starfield />
      
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Educational Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about asteroids, cosmic impacts, and the science behind planetary defense.
            Discover how we study and protect Earth from space threats.
          </p>
        </div>

        {/* What are Asteroids */}
        <section className="mb-16">
          <Card className="cosmic-glow mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Telescope className="w-8 h-8 text-primary" />
                <span>What are Asteroids?</span>
              </CardTitle>
              <CardDescription>
                Understanding these ancient rocky visitors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Asteroids are rocky objects orbiting the Sun, remnants from the solar system's formation 
                4.6 billion years ago. Most are found in the asteroid belt between Mars and Jupiter, 
                but some have orbits that bring them close to Earth.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-secondary/20 border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Composition</h4>
                  <p className="text-sm text-muted-foreground">
                    Made of rock, metal, and sometimes ice. C-type (carbonaceous), 
                    S-type (silicate), and M-type (metallic) are the main categories.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/20 border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Sizes</h4>
                  <p className="text-sm text-muted-foreground">
                    Range from tiny pebbles to Ceres (940 km diameter). 
                    Objects larger than 1 km could cause global effects.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/20 border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Orbits</h4>
                  <p className="text-sm text-muted-foreground">
                    Most orbit between Mars and Jupiter, but Near-Earth Asteroids (NEAs) 
                    have orbits that bring them within 1.3 AU of the Sun.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Famous Impacts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Famous Asteroid Impacts</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="cosmic-glow border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  <span>Chicxulub Impact</span>
                </CardTitle>
                <CardDescription>66 million years ago</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="destructive" className="mb-3">Extinction Event</Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  A 10-15 km asteroid struck the Yucatan Peninsula, creating a 150 km crater 
                  and causing the mass extinction that ended the dinosaurs.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Crater:</strong> 150 km diameter</p>
                  <p><strong>Energy:</strong> ~100 million megatons</p>
                  <p><strong>Effects:</strong> Global wildfires, nuclear winter</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-accent" />
                  <span>Tunguska Event</span>
                </CardTitle>
                <CardDescription>June 30, 1908</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-3">Airburst</Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  A 60-meter object exploded 5-10 km above Siberia, flattening 
                  2,000 km² of forest but leaving no crater.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Size:</strong> ~60 meters</p>
                  <p><strong>Energy:</strong> 10-15 megatons</p>
                  <p><strong>Damage:</strong> 80 million trees flattened</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-stellar-500/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-stellar-500" />
                  <span>Chelyabinsk</span>
                </CardTitle>
                <CardDescription>February 15, 2013</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3">Recent Event</Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  A 20-meter asteroid exploded over Russia, injuring over 1,500 people 
                  with glass from broken windows.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Size:</strong> ~20 meters</p>
                  <p><strong>Energy:</strong> 500 kilotons</p>
                  <p><strong>Injuries:</strong> 1,500+ (mostly glass cuts)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Crater Formation */}
        <section className="mb-16">
          <Card className="cosmic-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Target className="w-8 h-8 text-destructive" />
                <span>Crater Formation Process</span>
              </CardTitle>
              <CardDescription>
                How asteroid impacts reshape planetary surfaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Contact & Compression</h4>
                  <p className="text-sm text-muted-foreground">
                    Asteroid hits surface, compressing target material and creating shock waves.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-accent">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Excavation</h4>
                  <p className="text-sm text-muted-foreground">
                    Shock waves excavate material, throwing rock and debris outward.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-stellar-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-stellar-500">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Modification</h4>
                  <p className="text-sm text-muted-foreground">
                    Crater walls collapse and central peak may form in larger impacts.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-destructive">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Final Crater</h4>
                  <p className="text-sm text-muted-foreground">
                    Stable crater formed with ejecta blanket surrounding the rim.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Planetary Defense */}
        <section className="mb-16">
          <Card className="cosmic-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Shield className="w-8 h-8 text-stellar-500" />
                <span>Planetary Defense Strategies</span>
              </CardTitle>
              <CardDescription>
                How we can protect Earth from asteroid threats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg">
                Scientists and space agencies worldwide are developing technologies to detect 
                and deflect potentially hazardous asteroids before they impact Earth.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-stellar-500">Detection Methods</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-secondary/20">
                      <h5 className="font-medium">Ground-based Surveys</h5>
                      <p className="text-sm text-muted-foreground">
                        Telescopes like LINEAR, NEOWISE, and ATLAS scan the sky nightly.
                      </p>
                    </div>
                    <div className="p-3 rounded bg-secondary/20">
                      <h5 className="font-medium">Space-based Observatories</h5>
                      <p className="text-sm text-muted-foreground">
                        Satellites provide better coverage and can spot smaller objects.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Deflection Techniques</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-secondary/20">
                      <h5 className="font-medium">Kinetic Impactor</h5>
                      <p className="text-sm text-muted-foreground">
                        Spacecraft crashes into asteroid to change its velocity (DART mission).
                      </p>
                    </div>
                    <div className="p-3 rounded bg-secondary/20">
                      <h5 className="font-medium">Gravity Tractor</h5>
                      <p className="text-sm text-muted-foreground">
                        Spacecraft uses gravity to slowly pull asteroid off course.
                      </p>
                    </div>
                    <div className="p-3 rounded bg-secondary/20">
                      <h5 className="font-medium">Nuclear Device</h5>
                      <p className="text-sm text-muted-foreground">
                        Last resort: explosive device to fragment or deflect large asteroids.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Scientific Terms */}
        <section>
          <Card className="cosmic-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <BookOpen className="w-8 h-8 text-accent" />
                <span>Key Scientific Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { term: "Delta-V", definition: "Change in velocity needed to alter an orbit" },
                  { term: "Impact Energy", definition: "Kinetic energy released when asteroid hits surface" },
                  { term: "Eccentricity", definition: "Measure of how elliptical an orbit is (0 = circular)" },
                  { term: "Aphelion", definition: "Farthest point from the Sun in an orbit" },
                  { term: "Perihelion", definition: "Closest point to the Sun in an orbit" },
                  { term: "AU", definition: "Astronomical Unit: distance from Earth to Sun (150M km)" },
                  { term: "NEO", definition: "Near-Earth Object: asteroid with orbit close to Earth" },
                  { term: "PHA", definition: "Potentially Hazardous Asteroid: large NEO that could threaten Earth" },
                  { term: "Albedo", definition: "Measure of how much light an object reflects" },
                ].map((item) => (
                  <div key={item.term} className="p-3 rounded-lg bg-secondary/20 border border-primary/20">
                    <h5 className="font-semibold text-primary mb-1">{item.term}</h5>
                    <p className="text-sm text-muted-foreground">{item.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Education;