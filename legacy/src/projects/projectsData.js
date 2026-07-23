import projectOne from "../assets/project-1.png";
import projectTwo from "../assets/project-2.png";
import projectThree from "../assets/project-3.png";

const projects = {
  1: {
    title: "Hospital Inventory Management System",
    image: projectOne,
    description: (
      <>
        <p>
        Database Management, Easy tracking of details regarding Ventilators by their status.
        </p>
      </>
    ),
    github: "https://github.com/vinniebhanu2021/Hospital_Inventory_Management_System",
    demo: "https://netlify.com",
  },
  2: {
    title: "RAG_LLAMA_INTEGRATION_APP",
    image: projectTwo,
    description: (
      <>
        <p>
        RAG (Retrieval Augmented Generation) enhances Large Language Models (LLMs) by providing 
        real-time access to external, up-to-date information, improving their accuracy and factual grounding.
        </p>
      </>
    ),
    github: "https://github.com/vinniebhanu2021/RAG_LLAMA_INTEGRATION",
    demo: "https://netlify.com",
  },
  3: {
    title: "School Website ",
    image: projectThree,
    description: (
      <>
        <p>
          This School website gives information of classes and allows students to 
          switch between telugu and english medium and also provided with chat section.
        </p>
      </>
    ),
    github: "https://github.com/vinniebhanu2021/School_Website",
    demo: "https://netlify.com",
  },
};

export default projects;
