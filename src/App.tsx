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
          instructions="AI help that shows up right when you need it"
        />
      </CopilotKit>
    </div>
  );
}

export default App;