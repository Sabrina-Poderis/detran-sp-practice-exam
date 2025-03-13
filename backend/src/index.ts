import 'module-alias/register';
import express from 'express';

import questionRoutes from '@modules/QuestionDetran/routes';
import simulatedExamRoutes from '@modules/SimulatedExam/routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/questions', questionRoutes);
app.use('/simulated-exam', simulatedExamRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});