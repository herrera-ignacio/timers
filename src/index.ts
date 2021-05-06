import { Timer } from './entities/Timer';

const timer = new Timer({ limitMs: 5000, runningMs: 1000 });

timer.start();
