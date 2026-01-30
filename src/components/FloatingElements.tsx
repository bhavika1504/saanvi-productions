import { motion } from 'framer-motion';

const shapes = [
  { type: 'circle', size: 60, color: 'cta', delay: 0, duration: 8, x: '10%', y: '20%' },
  { type: 'circle', size: 40, color: 'accent', delay: 1, duration: 10, x: '85%', y: '15%' },
  { type: 'circle', size: 80, color: 'cta', delay: 2, duration: 12, x: '75%', y: '70%' },
  { type: 'square', size: 50, color: 'accent', delay: 0.5, duration: 9, x: '20%', y: '75%' },
  { type: 'square', size: 35, color: 'cta', delay: 1.5, duration: 11, x: '90%', y: '45%' },
  { type: 'triangle', size: 45, color: 'accent', delay: 2.5, duration: 10, x: '5%', y: '50%' },
];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            rotate: shape.type === 'square' ? [0, 90, 0] : [0, 360, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' && (
            <div
              className={`rounded-full blur-sm ${
                shape.color === 'cta' ? 'bg-cta/20' : 'bg-accent/30'
              }`}
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className={`rounded-lg blur-sm ${
                shape.color === 'cta' ? 'bg-cta/20' : 'bg-accent/30'
              }`}
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className={`blur-sm ${
                shape.color === 'cta' ? 'border-b-cta/30' : 'border-b-accent/40'
              }`}
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
