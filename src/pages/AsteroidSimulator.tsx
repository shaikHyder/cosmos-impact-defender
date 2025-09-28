import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Starfield from '@/components/Starfield';
import { Calculator, Zap, AlertTriangle, Shield, Globe } from 'lucide-react';

interface AsteroidData {
  name: string;
  size: number;
  density: number;
  velocity: number;
  angle: number;
}

const predefinedAsteroids: AsteroidData[] = [
  {
    name: "Impactor-2025",
    size: 250,
    density: 3000,
    velocity: 20,
    angle: 45
  },
  {
    name: "Chelyabinsk-2013",
    size: 20,
    density: 3300,
    velocity: 19,
    angle: 18
  },
  {
    name: "Tunguska-1908",
    size: 60,
    density: 2000,
    velocity: 25,
    angle: 30
  }
];

const AsteroidSimulator: React.FC = () => {
  const [selectedAsteroid, setSelectedAsteroid] = useState<string>("custom");
  const [size, setSize] = useState([100]);
  const [velocity, setVelocity] = useState([20]);
  const [angle, setAngle] = useState([45]);
  const [deflectionDeltaV, setDeflectionDeltaV] = useState([0]);

  // Get current asteroid data
  const currentAsteroid = useMemo(() => {
    if (selectedAsteroid === "custom") {
      return {
        name: "Custom Asteroid",
        size: size[0],
        density: 3000, // Default stony asteroid
        velocity: velocity[0],
        angle: angle[0]
      };
    }
    const preset = predefinedAsteroids.find(a => a.name === selectedAsteroid);
    return preset || predefinedAsteroids[0];
  }, [selectedAsteroid, size, velocity, angle]);

  // Physics calculations
  const calculations = useMemo(() => {
    const radius = currentAsteroid.size / 2;
    const volume = (4/3) * Math.PI * Math.pow(radius, 3);
    const mass = volume * currentAsteroid.density;
    const kineticEnergy = 0.5 * mass * Math.pow(currentAsteroid.velocity * 1000, 2); // Convert km/s to m/s
    
    // Crater diameter (simplified scaling law)
    const craterDiameter = 1.25 * Math.pow(mass / 1e12, 0.25) * Math.pow(currentAsteroid.velocity, 0.5) * 1000; // meters
    
    // TNT equivalent (1 ton TNT = 4.184e9 J)
    const tntEquivalent = kineticEnergy / 4.184e9;
    
    // Deflection effectiveness
    const deflectionAngle = deflectionDeltaV[0] * 1000 / currentAsteroid.velocity; // simplified
    const deflectionDistance = deflectionAngle * 384400000; // Earth-Moon distance as reference
    
    return {
      mass: mass / 1e12, // in billions of kg
      energy: kineticEnergy / 1e15, // in petajoules
      tntEquivalent,
      craterDiameter: craterDiameter / 1000, // in km
      deflectionDistance: deflectionDistance / 1000 // in km
    };
  }, [currentAsteroid, deflectionDeltaV]);

  const handlePresetSelect = (asteroidName: string) => {
    setSelectedAsteroid(asteroidName);
    if (asteroidName !== "custom") {
      const preset = predefinedAsteroids.find(a => a.name === asteroidName);
      if (preset) {
        setSize([preset.size]);
        setVelocity([preset.velocity]);
        setAngle([preset.angle]);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 relative">
      <Starfield />
      
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Asteroid Impact Simulator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Adjust asteroid parameters and see the devastating effects of cosmic impacts on Earth.
            Experiment with deflection strategies to protect our planet.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="cosmic-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Asteroid Parameters</span>
                </CardTitle>
                <CardDescription>
                  Configure your asteroid's properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Predefined Asteroid</label>
                  <Select value={selectedAsteroid} onValueChange={handlePresetSelect}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom Asteroid</SelectItem>
                      {predefinedAsteroids.map((asteroid) => (
                        <SelectItem key={asteroid.name} value={asteroid.name}>
                          {asteroid.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Diameter: {currentAsteroid.size}m
                  </label>
                  <Slider
                    value={size}
                    onValueChange={setSize}
                    max={500}
                    min={10}
                    step={10}
                    className="cosmic-glow"
                    disabled={selectedAsteroid !== "custom"}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Velocity: {currentAsteroid.velocity} km/s
                  </label>
                  <Slider
                    value={velocity}
                    onValueChange={setVelocity}
                    max={40}
                    min={10}
                    step={1}
                    disabled={selectedAsteroid !== "custom"}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Entry Angle: {currentAsteroid.angle}°
                  </label>
                  <Slider
                    value={angle}
                    onValueChange={setAngle}
                    max={90}
                    min={15}
                    step={5}
                    disabled={selectedAsteroid !== "custom"}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-stellar-500/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-stellar-500" />
                  <span>Deflection Strategy</span>
                </CardTitle>
                <CardDescription>
                  Apply delta-v to change asteroid trajectory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Delta-V: {deflectionDeltaV[0]} km/s
                  </label>
                  <Slider
                    value={deflectionDeltaV}
                    onValueChange={setDeflectionDeltaV}
                    max={5}
                    min={0}
                    step={0.1}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Change in velocity applied to deflect the asteroid
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="cosmic-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  <span>Impact Analysis</span>
                </CardTitle>
                <CardDescription>
                  Calculated effects of {currentAsteroid.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary/20 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Asteroid Properties</h4>
                      <div className="space-y-1 text-sm">
                        <p>Diameter: <span className="text-foreground font-medium">{currentAsteroid.size}m</span></p>
                        <p>Mass: <span className="text-foreground font-medium">{calculations.mass.toFixed(2)} billion kg</span></p>
                        <p>Velocity: <span className="text-foreground font-medium">{currentAsteroid.velocity} km/s</span></p>
                        <p>Entry Angle: <span className="text-foreground font-medium">{currentAsteroid.angle}°</span></p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                      <h4 className="font-semibold text-destructive mb-2">Impact Energy</h4>
                      <div className="space-y-1 text-sm">
                        <p>Kinetic Energy: <span className="text-foreground font-medium">{calculations.energy.toFixed(2)} PJ</span></p>
                        <p>TNT Equivalent: <span className="text-foreground font-medium">
                          {calculations.tntEquivalent >= 1e6 
                            ? `${(calculations.tntEquivalent / 1e6).toFixed(1)} Mt`
                            : `${(calculations.tntEquivalent / 1e3).toFixed(1)} kt`
                          }
                        </span></p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                      <h4 className="font-semibold text-destructive mb-2">Crater Formation</h4>
                      <div className="space-y-1 text-sm">
                        <p>Crater Diameter: <span className="text-foreground font-medium">{calculations.craterDiameter.toFixed(2)} km</span></p>
                        <p>Crater Depth: <span className="text-foreground font-medium">{(calculations.craterDiameter * 0.2).toFixed(2)} km</span></p>
                      </div>
                    </div>

                    {deflectionDeltaV[0] > 0 && (
                      <div className="p-4 rounded-lg bg-stellar-500/10 border border-stellar-500/30">
                        <h4 className="font-semibold text-stellar-500 mb-2">Deflection Result</h4>
                        <div className="space-y-1 text-sm">
                          <p>Trajectory Shift: <span className="text-foreground font-medium">{calculations.deflectionDistance.toFixed(0)} km</span></p>
                          <p>Status: <span className="text-stellar-500 font-medium">
                            {calculations.deflectionDistance > 12756 ? "Earth Miss!" : "Impact Still Likely"}
                          </span></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-accent" />
                    Impact Assessment
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {calculations.tntEquivalent < 1000 
                      ? "This asteroid would likely burn up in the atmosphere or cause minimal damage."
                      : calculations.tntEquivalent < 1000000
                      ? "This impact would cause significant regional destruction, similar to major nuclear weapons."
                      : "This would be a civilization-threatening event, potentially causing global climate effects."
                    }
                    {deflectionDeltaV[0] > 0 && calculations.deflectionDistance > 12756 && 
                      " However, the applied deflection would successfully divert the asteroid away from Earth!"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Visualization placeholder */}
            <Card className="cosmic-glow">
              <CardHeader>
                <CardTitle>3D Trajectory Visualization</CardTitle>
                <CardDescription>
                  Interactive 3D model showing asteroid approach and impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-b from-background/50 to-secondary/20 rounded-lg border border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
                    <h3 className="text-xl font-semibold mb-2">3D Visualization</h3>
                    <p className="text-muted-foreground">
                      Interactive 3D scene will be implemented here showing<br />
                      Earth, asteroid trajectory, and impact visualization
                    </p>
                    <Button variant="cosmic" className="mt-4">
                      Enable 3D View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsteroidSimulator;