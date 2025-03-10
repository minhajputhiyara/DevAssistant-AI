import React from 'react';
import './App.css';
import Todo from './Todo';
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

function App() {
  return (
    <div className="App">
      <CopilotKit publicApiKey="ck_pub_1f2c74d33d9d84ff684c5d194f0d434b">
        <Todo />
        <CopilotPopup 
          labels={{
            title: "Popup Assistant",
            initial: "How can I help you today?"
          }}
          instructions="You are a developer assistant for a coding todo app. Help users manage their coding tasks, project milestones, and technical debt. You can create, delete, and mark todos as complete. Automatically prioritize tasks based on development best practices: HIGH priority for critical bugs, security issues, and blocking tasks; MEDIUM priority for feature implementations and non-blocking bugs; LOW priority for refactoring, documentation, and nice-to-have improvements. When a user adds a task, analyze its content to suggest an appropriate priority level without asking unless the priority is unclear. Break down complex development tasks into smaller, manageable steps. Maintain a technical yet friendly tone, and focus on helping developers stay organized and productive."
        />
      </CopilotKit>
    </div>
  );
}

export default App;