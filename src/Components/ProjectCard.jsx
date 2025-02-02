import React from "react";
import { Card } from "@/components/ui/card"; // Update path if needed
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ id, projectName, startDate, endDate, status, progress }) => {
  const navigate = useNavigate();

  const handleMoreInfo = () => {
    navigate(`/project-details/${id}`); // Pass only the id in the URL
  };

  return (
    <Card className="w-[22.4rem] p-5 space-y-4 mt-4">
      <h1 className="text-2xl font-bold text-gray-900">{projectName}</h1>
      <div className="flex items-center space-x-2 text-gray-600">
        <Calendar size={16} />
        <div className="flex justify-between w-full text-sm">
          <span>From {startDate}</span>
          <span>To {endDate}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">Status</span>
        <span
          className={`px-3 py-1 text-sm rounded-full ${status === "In Progress"
            ? "bg-blue-100 text-blue-800"
            : status === "Completed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
            }`}
        >
          {status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-blue-600">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <Button
        variant="outline"
        className="w-full mt-4 flex items-center justify-between"
        onClick={handleMoreInfo}
      >
        More Info
        <ChevronRight size={16} />
      </Button>
    </Card>
  );
};

export default ProjectCard;
