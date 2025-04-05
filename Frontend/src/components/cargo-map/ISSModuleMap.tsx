
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ISSModuleMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // This is a simplified placeholder for a real Three.js implementation
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvasRef.current.getBoundingClientRect();
    canvasRef.current.width = rect.width * dpr;
    canvasRef.current.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Draw ISS modules (simplified representation)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Unity (Node 1) - Central node
    ctx.fillStyle = '#3B82F6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Unity', centerX, centerY + 4);
    
    // Destiny (US Lab)
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(centerX + 100, centerY, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Destiny', centerX + 100, centerY + 4);
    
    // Connect Unity and Destiny
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(centerX + 30, centerY);
    ctx.lineTo(centerX + 75, centerY);
    ctx.stroke();
    
    // Harmony (Node 2)
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(centerX - 100, centerY, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Harmony', centerX - 100, centerY + 4);
    
    // Connect Unity and Harmony
    ctx.strokeStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(centerX - 30, centerY);
    ctx.lineTo(centerX - 75, centerY);
    ctx.stroke();
    
    // Tranquility (Node 3)
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(centerX, centerY + 100, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Tranquility', centerX, centerY + 104);
    
    // Connect Unity and Tranquility
    ctx.strokeStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 30);
    ctx.lineTo(centerX, centerY + 75);
    ctx.stroke();
    
    // Columbus (ESA)
    ctx.fillStyle = '#8B5CF6';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 100, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Columbus', centerX, centerY - 96);
    
    // Connect Unity and Columbus
    ctx.strokeStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 30);
    ctx.lineTo(centerX, centerY - 75);
    ctx.stroke();
    
    // Add a pulsing effect to indicate activity
    const pulse = () => {
      const time = new Date().getTime() * 0.001;
      const size = Math.sin(time * 2) * 5 + 35;
      
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, size, 0, 2 * Math.PI);
      ctx.fill();
      
      requestAnimationFrame(pulse);
    };
    
    const animationId = requestAnimationFrame(pulse);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle>ISS Module Map</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <canvas 
          ref={canvasRef} 
          className="w-full h-[500px]"
          style={{ maxWidth: '800px' }}
        />
      </CardContent>
    </Card>
  );
}
