import Card from "../../components/common/Card";
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Card>...</Card>
</motion.div>

export default function Dashboard() {
  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">

      <Card>
        <h2 className="text-lg text-gray-400">Subscription</h2>
        <p className="text-2xl font-bold text-primary">Active</p>
      </Card>

      <Card>
        <h2 className="text-lg text-gray-400">Total Winnings</h2>
        <p className="text-2xl font-bold">₹2,500</p>
      </Card>

      <Card>
        <h2 className="text-lg text-gray-400">Next Draw</h2>
        <p className="text-2xl font-bold">April 30</p>
      </Card>

    </div>
  );
}