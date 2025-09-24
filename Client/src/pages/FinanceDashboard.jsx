import React, { useState } from "react";
import { Card, CardContent } from "../Components/ui/Card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

// Department Colors
const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#f59e0b", "#9333ea"];

const FinanceDashboard = () => {
  // Mock finance data
  const [financeData] = useState({
    totalBudget: 12000000,
    allocated: 9500000,
    spent: 7800000,
    pendingRequests: 5,
  });

  // Department-wise allocation
  const [departments] = useState([
    { name: "Engineering", allocated: 3000000, spent: 2500000 },
    { name: "Maintenance", allocated: 2000000, spent: 1500000 },
    { name: "Operations", allocated: 2500000, spent: 2200000 },
    { name: "HR", allocated: 1000000, spent: 800000 },
    { name: "Salaries", allocated: 1000000, spent: 800000 },
  ]);

  // Requests from departments
  const [requests] = useState([
    { id: 1, dept: "Engineering", purpose: "New tools procurement", amount: 500000, status: "Pending" },
    { id: 2, dept: "Maintenance", purpose: "Spare parts replacement", amount: 200000, status: "Approved" },
    { id: 3, dept: "HR", purpose: "Employee training budget", amount: 150000, status: "Rejected" },
    { id: 4, dept: "Operations", purpose: "Software license renewal", amount: 300000, status: "Pending" },
    { id: 5, dept: "Salaries", purpose: "Overtime compensation", amount: 400000, status: "Pending" },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">Finance Department Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-md rounded-2xl">
          <CardContent className="flex items-center space-x-4 p-4">
            <DollarSign className="w-10 h-10 text-green-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Budget</p>
              <p className="text-xl font-bold">₹{financeData.totalBudget.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardContent className="flex items-center space-x-4 p-4">
            <CreditCard className="w-10 h-10 text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Allocated</p>
              <p className="text-xl font-bold">₹{financeData.allocated.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardContent className="flex items-center space-x-4 p-4">
            <TrendingUp className="w-10 h-10 text-red-600" />
            <div>
              <p className="text-gray-500 text-sm">Spent</p>
              <p className="text-xl font-bold">₹{financeData.spent.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardContent className="flex items-center space-x-4 p-4">
            <AlertCircle className="w-10 h-10 text-yellow-600" />
            <div>
              <p className="text-gray-500 text-sm">Pending Requests</p>
              <p className="text-xl font-bold">{financeData.pendingRequests}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Allocation Chart */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department-wise Budget Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departments}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="allocated" fill="#2563eb" name="Allocated" />
              <Bar dataKey="spent" fill="#dc2626" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget Distribution Pie Chart */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Budget Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departments}
                dataKey="allocated"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {departments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department Requests</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Department</th>
                <th className="py-2">Purpose</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b">
                  <td className="py-2">{req.dept}</td>
                  <td className="py-2">{req.purpose}</td>
                  <td className="py-2 font-medium">₹{req.amount.toLocaleString()}</td>
                  <td className="py-2 flex items-center space-x-2">
                    {req.status === "Approved" && <CheckCircle className="text-green-600 w-5 h-5" />}
                    {req.status === "Rejected" && <XCircle className="text-red-600 w-5 h-5" />}
                    {req.status === "Pending" && <Clock className="text-yellow-600 w-5 h-5" />}
                    <span
                      className={
                        req.status === "Approved"
                          ? "text-green-600"
                          : req.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
