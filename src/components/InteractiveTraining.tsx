import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrainingDataPoint {
  epoch: number;
  loss: number;
  accuracy: number;
}

const InteractiveTraining: React.FC = () => {
  // Hyperparameters
  const [learningRate, setLearningRate] = useState<number>(0.01);
  const [batchSize, setBatchSize] = useState<number>(32);
  const [optimizer, setOptimizer] = useState<string>('Adam');
  const [modelType, setModelType] = useState<string>('CNN (Image)');
  const [maxEpochs, setMaxEpochs] = useState<number>(50);

  // Training State
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [currentEpoch, setCurrentEpoch] = useState<number>(0);
  const [history, setHistory] = useState<TrainingDataPoint[]>([]);
  const [logs, setLogs] = useState<string[]>(['Dashboard idle. Adjust parameters and click Start.']);
  const [trainingSpeed, setTrainingSpeed] = useState<number>(100); // ms per epoch

  // Current values
  const [currentLoss, setCurrentLoss] = useState<number>(0);
  const [currentAcc, setCurrentAcc] = useState<number>(0);

  const trainingRef = useRef<boolean>(false);
  const epochTimer = useRef<any>(null);

  // Clear training on unmount
  useEffect(() => {
    return () => {
      if (epochTimer.current) clearInterval(epochTimer.current);
    };
  }, []);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 7)]);
  };

  const resetTraining = () => {
    if (epochTimer.current) {
      clearInterval(epochTimer.current);
      epochTimer.current = null;
    }
    setIsTraining(false);
    trainingRef.current = false;
    setCurrentEpoch(0);
    setHistory([]);
    setCurrentLoss(0);
    setCurrentAcc(0);
    setLogs(['System reset. Ready to train.']);
  };

  const startTraining = () => {
    if (isTraining) {
      // Pause
      setIsTraining(false);
      trainingRef.current = false;
      if (epochTimer.current) {
        clearInterval(epochTimer.current);
        epochTimer.current = null;
      }
      addLog('Training paused.');
      return;
    }

    setIsTraining(true);
    trainingRef.current = true;
    addLog(`Training started: ${modelType} with ${optimizer} optimizer.`);

    // If starting fresh
    let startEpoch = currentEpoch;
    let currentHistory = [...history];

    if (startEpoch === 0) {
      currentHistory = [];
      setHistory([]);
      addLog('Initializing model weights...');
      addLog('Loading datasets (60,000 samples)...');
    }

    // Determine curve parameters based on learning rate
    // Large LR = quick drop but might bounce/diverge
    // Small LR = slow drop
    const lrFactor = learningRate * 80;
    const finalLoss = lrFactor > 2 ? 0.35 + Math.random() * 0.2 : 0.05 + Math.random() * 0.05;
    const finalAcc = lrFactor > 2 ? 0.82 + Math.random() * 0.05 : 0.97 + Math.random() * 0.02;

    epochTimer.current = setInterval(() => {
      if (!trainingRef.current) return;

      startEpoch++;
      if (startEpoch > maxEpochs) {
        setIsTraining(false);
        trainingRef.current = false;
        if (epochTimer.current) clearInterval(epochTimer.current);
        addLog('★ Training complete! Model convergence achieved.');
        return;
      }

      // Calculate simulated training loss & accuracy curves
      // Loss: initial high ~ 2.3, decays towards finalLoss
      const noise = (Math.random() - 0.5) * (0.15 / (startEpoch * 0.2 + 1));
      const decay = Math.exp(-startEpoch * (learningRate * 4)) * 2.0;
      const lossVal = Math.max(finalLoss, finalLoss + decay + noise);

      // Accuracy: initial low ~ 0.1, climbs towards finalAcc
      const accNoise = (Math.random() - 0.5) * (0.04 / (startEpoch * 0.2 + 1));
      const climb = (1 - Math.exp(-startEpoch * (learningRate * 4.5))) * (finalAcc - 0.1);
      const accVal = Math.min(1.0, Math.max(0.1, 0.1 + climb + accNoise));

      const newPoint: TrainingDataPoint = {
        epoch: startEpoch,
        loss: Number(lossVal.toFixed(4)),
        accuracy: Number(accVal.toFixed(4))
      };

      currentHistory.push(newPoint);
      setHistory([...currentHistory]);
      setCurrentEpoch(startEpoch);
      setCurrentLoss(newPoint.loss);
      setCurrentAcc(newPoint.accuracy);

      if (startEpoch % 5 === 0 || startEpoch === 1) {
        addLog(`Epoch ${startEpoch}/${maxEpochs} - loss: ${newPoint.loss} - accuracy: ${newPoint.accuracy}`);
      }
    }, trainingSpeed);
  };

  // Render SVG charts
  const width = 450;
  const height = 180;
  const padding = 20;

  const pointsLoss = history.map((pt) => {
    // map epoch (0 to maxEpochs) to x (padding to width - padding)
    const x = padding + (pt.epoch / maxEpochs) * (width - 2 * padding);
    // map loss (0 to 2.5) to y (height - padding to padding)
    const y = height - padding - (pt.loss / 2.5) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const pointsAcc = history.map((pt) => {
    const x = padding + (pt.epoch / maxEpochs) * (width - 2 * padding);
    // map accuracy (0 to 1.0) to y
    const y = height - padding - pt.accuracy * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  // Neural network nodes illustration
  const layerSizes = [4, 6, 5, 2];

  return (
    <div id="ml-playground" className="glass-card ml-widget-container">
      <div className="ml-widget-header">
        <span className="subtitle" style={{ color: 'var(--primary-light)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '2px' }}>Interactive Lab</span>
        <h3>ML Training Simulator</h3>
        <p>Experiment with neural net hyperparameters to see model convergence in real time.</p>
      </div>

      <div className="ml-widget-grid">
        {/* Controls Panel */}
        <div className="ml-controls">
          <div className="control-group">
            <label className="control-label">
              <span>Model Architecture</span>
            </label>
            <select
              value={modelType}
              onChange={(e) => { resetTraining(); setModelType(e.target.value); }}
              disabled={isTraining}
              className="control-select"
            >
              <option value="CNN (Image)">CNN (MobileNetV2 Classification)</option>
              <option value="Transformer (Text)">Llama-3 Fine-Tuning</option>
              <option value="MLP (Structured)">Multi-Layer Perceptron</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">
              <span>Optimizer</span>
            </label>
            <select
              value={optimizer}
              onChange={(e) => { resetTraining(); setOptimizer(e.target.value); }}
              disabled={isTraining}
              className="control-select"
            >
              <option value="Adam">Adam (Adaptive Moment Estimation)</option>
              <option value="SGD">SGD (Stochastic Gradient Descent)</option>
              <option value="RMSprop">RMSprop</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">
              <span>Learning Rate (α)</span>
              <span className="control-val">{learningRate}</span>
            </label>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.005"
              value={learningRate}
              onChange={(e) => { resetTraining(); setLearningRate(Number(e.target.value)); }}
              disabled={isTraining}
              className="control-slider"
            />
          </div>

          <div className="control-group">
            <label className="control-label">
              <span>Batch Size</span>
              <span className="control-val">{batchSize}</span>
            </label>
            <input
              type="range"
              min="8"
              max="128"
              step="8"
              value={batchSize}
              onChange={(e) => { resetTraining(); setBatchSize(Number(e.target.value)); }}
              disabled={isTraining}
              className="control-slider"
            />
          </div>

          <div className="control-group">
            <label className="control-label">
              <span>Max Epochs</span>
              <span className="control-val">{maxEpochs}</span>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={maxEpochs}
              onChange={(e) => { resetTraining(); setMaxEpochs(Number(e.target.value)); }}
              disabled={isTraining}
              className="control-slider"
            />
          </div>

          <div className="control-group">
            <label className="control-label">
              <span>Simulation Speed</span>
              <span className="control-val">{trainingSpeed}ms</span>
            </label>
            <input
              type="range"
              min="20"
              max="300"
              step="10"
              value={trainingSpeed}
              onChange={(e) => setTrainingSpeed(Number(e.target.value))}
              className="control-slider"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button
              onClick={startTraining}
              className="btn btn-primary"
              style={{ flexGrow: 1, padding: '10px' }}
            >
              <Play size={16} />
              {isTraining ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTraining}
              className="btn btn-secondary"
              style={{ padding: '10px 14px' }}
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Visualizer & Logs Panel */}
        <div className="ml-visualizer">
          <div className="visualizer-screen">
            <div className="screen-grid-bg"></div>
            <div style={{ position: 'absolute', top: '6px', left: '6px', width: '8px', height: '8px', borderTop: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', opacity: 0.6, pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderTop: '2px solid var(--cyan)', borderRight: '2px solid var(--cyan)', opacity: 0.6, pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '6px', left: '6px', width: '8px', height: '8px', borderBottom: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', opacity: 0.6, pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '6px', right: '6px', width: '8px', height: '8px', borderBottom: '2px solid var(--cyan)', borderRight: '2px solid var(--cyan)', opacity: 0.6, pointerEvents: 'none' }}></div>
            <div className="screen-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} style={{ color: 'var(--cyan)' }} />
                <span>MODEL_MONITOR.LOG</span>
              </span>
              <div className="status-indicator">
                <div className={`status-dot ${isTraining ? 'active' : currentEpoch > 0 ? 'idle' : ''}`}></div>
                <span>{isTraining ? 'TRAINING' : currentEpoch > 0 ? 'PAUSED' : 'IDLE'}</span>
              </div>
            </div>

            <div className="screen-content">
              {history.length > 0 ? (
                <svg className="loss-chart-svg" viewBox={`0 0 ${width} ${height}`}>
                  {/* Grid Lines */}
                  <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.05)" />
                  <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.05)" />
                  <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.05)" />

                  {/* Chart Paths */}
                  {pointsLoss && <polyline points={pointsLoss} className="svg-path-loss" />}
                  {pointsAcc && <polyline points={pointsAcc} className="svg-path-acc" />}

                  {/* Draw grid lines at major intervals */}
                  <line x1={padding} y1={height - padding - (height - 2*padding)*0.5} x2={width - padding} y2={height - padding - (height - 2*padding)*0.5} stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                </svg>
              ) : (
                <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  {/* Render neural nodes layers representation */}
                  <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    {layerSizes.map((size, lIndex) => (
                      <div key={lIndex} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {Array.from({ length: size }).map((_, nIndex) => (
                          <motion.div
                            key={nIndex}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: (lIndex * 0.4) + (nIndex * 0.1)
                            }}
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: lIndex === 3 ? 'var(--cyan)' : 'var(--primary)',
                              boxShadow: `0 0 6px ${lIndex === 3 ? 'var(--cyan)' : 'var(--primary)'}`
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>[Nodes ready for backpropagation]</span>
                </div>
              )}
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'var(--cyan)' }}></div>
                <span>Loss</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'var(--magenta)' }}></div>
                <span>Accuracy</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-box">
              <div className="stat-label">Epoch</div>
              <div className="stat-value">{currentEpoch}/{maxEpochs}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Loss</div>
              <div className="stat-value">{currentLoss > 0 ? currentLoss.toFixed(4) : '—'}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Accuracy</div>
              <div className="stat-value magenta">{currentAcc > 0 ? `${(currentAcc * 100).toFixed(1)}%` : '—'}</div>
            </div>
          </div>

          {/* Terminal Console Logs */}
          <div className="terminal-console">
            <AnimatePresence>
              {logs.map((log, lIdx) => (
                <motion.div
                  key={lIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    color: log.startsWith('★') ? 'var(--cyan)' : log.includes('Epoch') ? 'var(--text-main)' : 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  &gt; {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTraining;
