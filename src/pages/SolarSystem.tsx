import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Starfield from '@/components/Starfield';
import { Loader2 } from 'lucide-react';

// Simple planet component
const Planet: React.FC<{ 
  position: [number, number, number];
  size: number;
  color: string;
  name: string;
}> = ({ position, size, color, name }) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

// Sun component
const Sun: React.FC = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color="#FDB813" />
      <pointLight intensity={1} decay={0.1} />
    </mesh>
  );
};

// Solar System Scene
const SolarSystemScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Stars radius={300} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      
      <Sun />
      
      {/* Planets with approximate relative sizes and distances */}
      <Planet position={[4, 0, 0]} size={0.3} color="#8C7853" name="Mercury" />
      <Planet position={[6, 0, 0]} size={0.4} color="#FFC649" name="Venus" />
      <Planet position={[8, 0, 0]} size={0.4} color="#6B93D6" name="Earth" />
      <Planet position={[10, 0, 0]} size={0.35} color="#C1440E" name="Mars" />
      <Planet position={[15, 0, 0]} size={1.2} color="#D8CA9D" name="Jupiter" />
      <Planet position={[20, 0, 0]} size={1.0} color="#FAD5A5" name="Saturn" />
      <Planet position={[25, 0, 0]} size={0.8} color="#4FD0E7" name="Uranus" />
      <Planet position={[30, 0, 0]} size={0.8} color="#4B70DD" name="Neptune" />
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={5}
        maxDistance={100}
      />
    </>
  );
};

const SolarSystem: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 relative">
      <Starfield />
      
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Solar System Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Navigate through our solar system in stunning 3D. Click and drag to rotate, scroll to zoom.
            Explore the cosmic neighborhood where asteroids travel.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Info Panel */}
          <div className="lg:col-span-1">
            <Card className="cosmic-glow">
              <CardHeader>
                <CardTitle>Solar System Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-stellar-500">The Sun</h4>
                  <p className="text-muted-foreground">
                    Our star contains 99.86% of the system's mass and provides the gravitational force that holds everything together.
                  </p>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-primary">Asteroid Belt</h4>
                  <p className="text-muted-foreground">
                    Located between Mars and Jupiter, containing millions of rocky objects from the solar system's formation.
                  </p>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-accent">Navigation</h4>
                  <p className="text-muted-foreground">
                    • Click & drag to rotate view<br />
                    • Scroll to zoom in/out<br />
                    • Right-click & drag to pan
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3D Solar System */}
          <div className="lg:col-span-3">
            <Card className="cosmic-glow">
              <CardContent className="p-0">
                <div className="h-96 lg:h-[600px] w-full rounded-lg overflow-hidden">
                  <Suspense fallback={
                    <div className="h-full flex items-center justify-center bg-gradient-to-b from-background/50 to-secondary/20">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading Solar System...</p>
                      </div>
                    </div>
                  }>
                    <Canvas
                      camera={{ position: [0, 10, 25], fov: 60 }}
                      style={{ background: 'transparent' }}
                    >
                      <SolarSystemScene />
                    </Canvas>
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Planet Information Grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Mercury", color: "border-yellow-600", distance: "57.9M km", facts: "Closest to Sun, extreme temperatures" },
            { name: "Venus", color: "border-orange-500", distance: "108.2M km", facts: "Hottest planet, thick atmosphere" },
            { name: "Earth", color: "border-blue-500", distance: "149.6M km", facts: "Our home, perfect for life" },
            { name: "Mars", color: "border-red-500", distance: "227.9M km", facts: "Red planet, potential for life" },
          ].map((planet) => (
            <Card key={planet.name} className={`cosmic-glow ${planet.color}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{planet.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-1">Distance: {planet.distance}</p>
                <p className="text-sm">{planet.facts}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;