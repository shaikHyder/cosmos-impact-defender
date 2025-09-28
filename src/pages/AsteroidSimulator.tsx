import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Starfield from '@/components/Starfield';
import AsteroidVisualization3D from '@/components/AsteroidVisualization3D';
import { Calculator, Zap, AlertTriangle, Shield, Globe, Target, Rocket } from 'lucide-react';

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
  },
  {
    name: "Chicxulub-Killer",
    size: 10000,
    density: 2500,
    velocity: 30,
    angle: 60
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
    const deflectionAngle = deflectionDeltaV[0] * 1000 / (currentAsteroid.velocity * 1000); // simplified
    const deflectionDistance = deflectionAngle * 384400000; // Earth-Moon distance as reference
    
    // Damage assessment
    const populationAffected = Math.min(Math.pow(craterDiameter / 1000, 2) * 1000000, 8000000000);
    
    return {
      mass: mass / 1e12, // in billions of kg
      energy: kineticEnergy / 1e15, // in petajoules
      tntEquivalent,
      craterDiameter: craterDiameter / 1000, // in km
      deflectionDistance: deflectionDistance / 1000, // in km
      populationAffected,
      survivalChance: deflectionDistance > 12756 ? 100 : Math.max(0, 100 - (tntEquivalent / 1000000) * 50)
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

  // Prepare data for 3D visualization
  const asteroidVisualizationData = {
    size: currentAsteroid.size,
    velocity: currentAsteroid.velocity,
    angle: currentAsteroid.angle,
    deflectionDeltaV: deflectionDeltaV[0]
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 relative">
      <Starfield />
      
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent animate-float">
            Advanced Asteroid Impact Simulator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience real-time 3D asteroid trajectory simulation. Watch as your parameter changes instantly 
            affect the cosmic dance between Earth and potential impactors.
          </p>
        </div>

        <div className="grid xl:grid-cols-5 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="cosmic-glow border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  <span>Asteroid Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure your asteroid's deadly parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Scenario</label>
                  <Select value={selectedAsteroid} onValueChange={handlePresetSelect}>
                    <SelectTrigger className="bg-secondary/20">
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

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center justify-between">
                      <span>Diameter: {currentAsteroid.size}m</span>
                      <Badge variant={currentAsteroid.size > 1000 ? "destructive" : currentAsteroid.size > 100 ? "secondary" : "outline"}>
                        {currentAsteroid.size > 1000 ? "City Killer" : currentAsteroid.size > 100 ? "Regional Threat" : "Local Impact"}
                      </Badge>
                    </label>
                    <Slider
                      value={size}
                      onValueChange={setSize}
                      max={1000}
                      min={10}
                      step={10}
                      className="cosmic-glow"
                      disabled={selectedAsteroid !== "custom"}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center justify-between">
                      <span>Velocity: {currentAsteroid.velocity} km/s</span>
                      <Badge variant={currentAsteroid.velocity > 30 ? "destructive" : "secondary"}>
                        {currentAsteroid.velocity > 30 ? "Hypersonic" : "Fast"}
                      </Badge>
                    </label>
                    <Slider
                      value={velocity}
                      onValueChange={setVelocity}
                      max={50}
                      min={10}
                      step={1}
                      disabled={selectedAsteroid !== "custom"}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center justify-between">
                      <span>Entry Angle: {currentAsteroid.angle}°</span>
                      <Badge variant={currentAsteroid.angle > 60 ? "destructive" : "secondary"}>
                        {currentAsteroid.angle > 60 ? "Steep" : "Shallow"}
                      </Badge>
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
                </div>
              </CardContent>
            </Card>

            <Card className="cosmic-glow border-stellar-500/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-stellar-500" />
                  <span>Planetary Defense System</span>
                </CardTitle>
                <CardDescription>
                  Apply deflection force to save humanity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center justify-between">
                    <span>Delta-V: {deflectionDeltaV[0]} km/s</span>
                    <Badge variant={deflectionDeltaV[0] > 0 ? "default" : "outline"}>
                      {deflectionDeltaV[0] > 0 ? "Active" : "Inactive"}
                    </Badge>
                  </label>
                  <Slider
                    value={deflectionDeltaV}
                    onValueChange={setDeflectionDeltaV}
                    max={5}
                    min={0}
                    step={0.1}
                    className="cosmic-glow"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Kinetic impactor or ion thruster deflection force
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stellar-500/10 border border-stellar-500/30">
                  <h4 className="font-semibold text-stellar-500 mb-2">Mission Status</h4>
                  <p className="text-sm">
                    {deflectionDeltaV[0] === 0 
                      ? "No deflection mission active. Earth is vulnerable."
                      : calculations.deflectionDistance > 12756
                      ? "🎯 Mission Success! Asteroid deflected away from Earth."
                      : "⚠️ Deflection insufficient. Increase delta-V or launch earlier."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="cosmic-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-accent" />
                  <span>Impact Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                    <h4 className="text-2xl font-bold text-destructive">
                      {calculations.tntEquivalent >= 1e6 
                        ? `${(calculations.tntEquivalent / 1e6).toFixed(1)}Mt`
                        : `${(calculations.tntEquivalent / 1e3).toFixed(1)}kt`
                      }
                    </h4>
                    <p className="text-xs text-muted-foreground">TNT Equivalent</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                    <h4 className="text-2xl font-bold text-accent">
                      {calculations.craterDiameter.toFixed(1)}km
                    </h4>
                    <p className="text-xs text-muted-foreground">Crater Diameter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3D Visualization with Real-Time Data */}
          <div className="xl:col-span-3">
            <Card className="cosmic-glow h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>Real-Time 3D Trajectory Simulation</span>
                </CardTitle>
                <CardDescription>
                  Watch the asteroid approach Earth. Red trajectory = Impact, Green = Miss
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] p-0">
                <div className="grid grid-cols-4 h-full">
                  {/* 3D Animation */}
                  <div className="col-span-3 h-full">
                    <AsteroidVisualization3D asteroidData={asteroidVisualizationData} />
                  </div>
                  
                  {/* Real-Time Data Panel */}
                  <div className="col-span-1 p-4 border-l border-border bg-secondary/20 overflow-y-auto">
                    <h3 className="font-semibold text-primary mb-4 text-sm">Live Impact Data</h3>
                    
                    {/* Current Asteroid Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="p-2 rounded bg-primary/10 border border-primary/30">
                        <div className="text-xs text-muted-foreground">Diameter</div>
                        <div className="text-lg font-bold text-primary">{currentAsteroid.size}m</div>
                      </div>
                      
                      <div className="p-2 rounded bg-destructive/10 border border-destructive/30">
                        <div className="text-xs text-muted-foreground">Velocity</div>
                        <div className="text-lg font-bold text-destructive">{currentAsteroid.velocity} km/s</div>
                      </div>
                      
                      <div className="p-2 rounded bg-accent/10 border border-accent/30">
                        <div className="text-xs text-muted-foreground">Entry Angle</div>
                        <div className="text-lg font-bold text-accent">{currentAsteroid.angle}°</div>
                      </div>
                    </div>

                    {/* Impact Calculations */}
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-destructive text-sm">Destruction Power</h4>
                      
                      <div className="p-2 rounded bg-destructive/10 border border-destructive/30">
                        <div className="text-xs text-muted-foreground">Mass</div>
                        <div className="text-sm font-bold text-destructive">{calculations.mass.toFixed(1)}B kg</div>
                      </div>
                      
                      <div className="p-2 rounded bg-destructive/10 border border-destructive/30">
                        <div className="text-xs text-muted-foreground">TNT Equivalent</div>
                        <div className="text-sm font-bold text-destructive">
                          {calculations.tntEquivalent >= 1e6 
                            ? `${(calculations.tntEquivalent / 1e6).toFixed(1)}Mt`
                            : `${(calculations.tntEquivalent / 1e3).toFixed(1)}kt`
                          }
                        </div>
                      </div>
                      
                      <div className="p-2 rounded bg-destructive/10 border border-destructive/30">
                        <div className="text-xs text-muted-foreground">Crater Size</div>
                        <div className="text-sm font-bold text-destructive">{calculations.craterDiameter.toFixed(1)} km</div>
                      </div>
                      
                      <div className="p-2 rounded bg-destructive/10 border border-destructive/30">
                        <div className="text-xs text-muted-foreground">People at Risk</div>
                        <div className="text-sm font-bold text-destructive">
                          {calculations.populationAffected > 1e6 
                            ? `${(calculations.populationAffected / 1e6).toFixed(1)}M`
                            : `${(calculations.populationAffected / 1e3).toFixed(0)}K`
                          }
                        </div>
                      </div>
                    </div>

                    {/* Defense Status */}
                    {deflectionDeltaV[0] > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-stellar-500 text-sm">Defense Status</h4>
                        
                        <div className="p-2 rounded bg-stellar-500/10 border border-stellar-500/30">
                          <div className="text-xs text-muted-foreground">Delta-V Applied</div>
                          <div className="text-sm font-bold text-stellar-500">{deflectionDeltaV[0]} km/s</div>
                        </div>
                        
                        <div className="p-2 rounded bg-stellar-500/10 border border-stellar-500/30">
                          <div className="text-xs text-muted-foreground">Trajectory Shift</div>
                          <div className="text-sm font-bold text-stellar-500">{calculations.deflectionDistance.toFixed(0)} km</div>
                        </div>
                        
                        <div className={`p-2 rounded border ${calculations.deflectionDistance > 12756 ? 'bg-green-500/10 border-green-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
                          <div className="text-xs text-muted-foreground">Mission Status</div>
                          <div className={`text-sm font-bold ${calculations.deflectionDistance > 12756 ? 'text-green-500' : 'text-destructive'}`}>
                            {calculations.deflectionDistance > 12756 ? "SUCCESS" : "FAILED"}
                          </div>
                        </div>
                        
                        <div className={`p-2 rounded border ${calculations.survivalChance > 90 ? 'bg-green-500/10 border-green-500/30' : calculations.survivalChance > 50 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
                          <div className="text-xs text-muted-foreground">Survival Chance</div>
                          <div className={`text-sm font-bold ${calculations.survivalChance > 90 ? 'text-green-500' : calculations.survivalChance > 50 ? 'text-yellow-500' : 'text-destructive'}`}>
                            {calculations.survivalChance.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Threat Assessment */}
                    <div className="mt-6 p-3 rounded bg-muted/20 border border-border">
                      <h4 className="font-semibold text-xs mb-2 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1 text-accent" />
                        Threat Level
                      </h4>
                      <Badge variant={calculations.tntEquivalent > 10000000 ? "destructive" : calculations.tntEquivalent > 100000 ? "secondary" : "outline"} className="text-xs">
                        {calculations.tntEquivalent > 10000000 
                          ? "EXTINCTION EVENT" 
                          : calculations.tntEquivalent > 100000
                          ? "GLOBAL THREAT"
                          : calculations.tntEquivalent > 1000
                          ? "REGIONAL DANGER"
                          : "LOCAL IMPACT"
                        }
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="mt-8">
          <Card className="cosmic-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-primary" />
                <span>Detailed Impact Analysis</span>
              </CardTitle>
              <CardDescription>
                Scientific calculations for {currentAsteroid.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary mb-3">Physical Properties</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Diameter:</span>
                      <span className="font-medium">{currentAsteroid.size}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mass:</span>
                      <span className="font-medium">{calculations.mass.toFixed(2)} billion kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Velocity:</span>
                      <span className="font-medium">{currentAsteroid.velocity} km/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entry Angle:</span>
                      <span className="font-medium">{currentAsteroid.angle}°</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-destructive mb-3">Destruction Potential</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Kinetic Energy:</span>
                      <span className="font-medium">{calculations.energy.toFixed(2)} PJ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TNT Equivalent:</span>
                      <span className="font-medium text-destructive">
                        {calculations.tntEquivalent >= 1e6 
                          ? `${(calculations.tntEquivalent / 1e6).toFixed(1)} Mt`
                          : `${(calculations.tntEquivalent / 1e3).toFixed(1)} kt`
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crater Diameter:</span>
                      <span className="font-medium">{calculations.craterDiameter.toFixed(2)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>People at Risk:</span>
                      <span className="font-medium text-destructive">
                        {calculations.populationAffected > 1e6 
                          ? `${(calculations.populationAffected / 1e6).toFixed(1)}M`
                          : `${(calculations.populationAffected / 1e3).toFixed(0)}K`
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-stellar-500 mb-3">Defense Analysis</h4>
                  <div className="space-y-2 text-sm">
                    {deflectionDeltaV[0] > 0 ? (
                      <>
                        <div className="flex justify-between">
                          <span>Deflection:</span>
                          <span className="font-medium">{deflectionDeltaV[0]} km/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Trajectory Shift:</span>
                          <span className="font-medium">{calculations.deflectionDistance.toFixed(0)} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mission Status:</span>
                          <span className={`font-medium ${calculations.deflectionDistance > 12756 ? 'text-green-500' : 'text-destructive'}`}>
                            {calculations.deflectionDistance > 12756 ? "SUCCESS" : "FAILED"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Survival Chance:</span>
                          <span className={`font-medium ${calculations.survivalChance > 90 ? 'text-green-500' : calculations.survivalChance > 50 ? 'text-yellow-500' : 'text-destructive'}`}>
                            {calculations.survivalChance.toFixed(0)}%
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
                        <p className="text-destructive font-medium">No Defense Active</p>
                        <p className="text-xs text-muted-foreground">Apply delta-V to deflect asteroid</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border">
                <h4 className="font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-accent" />
                  Scientific Assessment
                </h4>
                <p className="text-sm text-muted-foreground">
                  {calculations.tntEquivalent < 1000 
                    ? "This asteroid would likely burn up in the atmosphere with minimal surface damage. Spectacular meteor show expected."
                    : calculations.tntEquivalent < 100000
                    ? "Regional destruction expected. City-wide devastation, but humanity survives. Evacuation protocols recommended."
                    : calculations.tntEquivalent < 10000000
                    ? "Continental catastrophe. Mass extinctions likely, nuclear winter possible. Global emergency response required."
                    : "Planetary extinction event. Civilization collapse imminent. Only deflection can save humanity."
                  }
                  {deflectionDeltaV[0] > 0 && calculations.deflectionDistance > 12756 && 
                    " Fortunately, the applied deflection mission successfully diverts this cosmic threat away from Earth! 🎯"
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AsteroidSimulator;