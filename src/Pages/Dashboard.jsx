import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from '../components_temp/ProjectCard';

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetching data from the provided JSON URL
        const apiUrl =
            "https://raw.githubusercontent.com/Harshit-Patle/DataSets/refs/heads/main/Projects-Data.json";

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-row flex-wrap gap-4 p-4">
            {data.projects.map((project) => (
                <ProjectCard
                    key={project.projectId}
                    id={project.projectId} // Pass the id here
                    projectName={project.projectOverview.name}
                    startDate={project.projectOverview.startDate}
                    endDate={project.projectOverview.endDate}
                    status={project.projectOverview.status}
                    progress={project.projectOverview.progress}
                />
            ))}
        </div>
    );
}

export default Dashboard;