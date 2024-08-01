import React, { useState,useEffect } from "react";
import axios from "axios";


const ProblemSolve = ({match})=> {
    const [problem,setProblem]=useState(null);
    useEffect(()=>{
        const fetchProblem=async()=>{
            try {
                const response=await axios.get(`https://api.algoarena.site/${match.param.id}`);
                setProblem(response.data);
            } catch (error) {
                console.error('error fetchung the problem statement',error);
            }
        };
        fetchProblem();
    },[match.param.id]);
  return (
    <div className="w-1/2 p-4 overflow-y-auto">
        {problem ? (
          <div>
            <h1 className="text-xl font-bold">{problem.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: problem.statement }} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
  )
}

export default ProblemSolve;