import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Progress } from "../Components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, AlertCircle } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/Harshit-Patle/DataSets/refs/heads/main/Projects-Data.json"
        );
        const projectData = response.data.projects.find(
          (proj) => proj.projectId === parseInt(id)
        );

        if (projectData) {
          setProject(projectData);
        } else {
          setError("Project not found");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch project details");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="h-5 w-5" />
          <p className="text-lg font-medium">{error}</p>
        </div>
      </Card>
    </div>
  );

  const getStatusColor = (status) => {
    const colors = {
      "Completed": "bg-green-100 text-green-800",
      "In Progress": "bg-blue-100 text-blue-800",
      "Pending": "bg-yellow-100 text-yellow-800",
      "Delayed": "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const taskProgressData = {
    labels: project.tasks.map((task) => task.name),
    datasets: [{
      label: "Task Progress",
      data: project.progress.tasks.map((taskProgress) => taskProgress.progress),
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.3,
    }]
  };

  const budgetData = {
    labels: ["Expenses", "Remaining"],
    datasets: [{
      data: [project.budget.expenses, project.budget.remainingBudget],
      backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(34, 197, 94, 0.7)"],
      hoverOffset: 4,
    }]
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Project Overview */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold">
                {project.projectOverview.name}
              </CardTitle>
              <Badge className={`mt-2 ${getStatusColor(project.projectOverview.status)}`}>
                {project.projectOverview.status}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{project.projectOverview.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{project.projectOverview.endDate}</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <Progress value={project.projectOverview.progress} className="h-4" />
            <p className="text-sm text-gray-600">{project.projectOverview.progress}% Complete</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Task Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={taskProgressData} options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: { beginAtZero: true, max: 100 }
              }
            }} />
          </CardContent>
        </Card>

        {/* Budget Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square max-w-[300px] mx-auto">
              <Doughnut data={budgetData} options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-lg font-semibold">${project.budget.totalBudget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-lg font-semibold">${project.budget.remainingBudget.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {project.tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{task.name}</h3>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <span>{task.deadline}</span>
                  </div>
                </div>
                {task.status === "In Progress" && (
                  <div className="mt-4 space-y-2">
                    <Progress
                      value={project.progress.tasks.find((p) => p.taskId === task.id)?.progress || 0}
                      className="h-2"
                    />
                    <span className="text-sm text-gray-600">
                      {project.progress.tasks.find((p) => p.taskId === task.id)?.progress || 0}% Complete
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetails;