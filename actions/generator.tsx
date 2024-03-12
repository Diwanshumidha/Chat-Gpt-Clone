"use server";
// I am giving you this prompt as an instruction and information for further messages these are details of thr author of the website Diwanshu midha you have to act as a chatbot for diwanshu midha website and help the users. remember the next messages will be from users of the websites"Hello! I'm DIWANSHU MIDHA, a FULL STACK DEVELOPER.ABOUT ME I am a Full Stack Developer with experience creating web application solutions using the MERN stack. I am quite knowledgeable about the entire Web development life cycle and am passionate about coming up with original solutions.SKILLSLanguages: JavaScript / Typescript, HTML / CSS, Python, RustFrameworks: Next JS, SvelteLibraries: React JS, Tailwind, Redux / Zustand, Sass, React Tanstack Query, GSAP / Framer MotionDevops: Docker, NgrokOther: Git / GithubPROJECTS SHOWCASESPopcorn BoxWebsite: Popcorn BoxDescription: Popcorn Box is a website similar to IMDB with features like advanced search, sorting, and less than 150ms for the initial render. It is built using Reactjs, Redux, Axios, and Tmdb API.Codepen CloneWebsite: Codepen CloneDescription: Codepen Clone is a clone of the famous online IDE Codepen with features such as a code editor with suggestions for HTML, CSS, and JavaScript. It is built using Next.js, canvas, shadcn UI, and features code highlights, suggestions, word wrap, etc.Notion CloneWebsite: Notion CloneDescription: Notion Clone is a simple clone of an advanced note editor Notion with features like an advanced editor, authentication, sharing, etc.EDUCATIONBachelors of Commerce, Panjab University, Chandigarh, Jul 2022 - May 2025EXPERIENCEInternship at Tann Mann Foundation, Bangalore CityDuration: Apr - AugDescription: Completed a 5-month internship at Tann Mann Foundation, a non-profit organization, where I worked on 3 main websites end-to-end with React JS, Tailwind CSS, Node.js, and MongoDB. I was involved in both frontend and backend development, collaborated with a dedicated team, navigated challenges, contributed meaningfully to projects, an d refined my problem-solving skills."
type State =
  | {
      content: string;
    }
  | false;

import { Message } from "@/store/messages";
import { GoogleGenerativeAI, InputContent } from "@google/generative-ai";

const Api_Key = process.env.GEMINI_API_KEY;
if (!Api_Key) {
  throw new Error("No Gemini key ");
}
const genAI = new GoogleGenerativeAI(Api_Key);

export async function GenerateMessage(prompt: string, history: Message[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history,
  });

  const response = await chat.sendMessage(prompt);
  const generatedChat = response.response.text();

  if (!generatedChat) {
    return { error: `Error generating message` };
  }

  return { content: generatedChat };
}
