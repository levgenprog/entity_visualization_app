
import { useState } from 'react';
import './App.css';
import EntityList from './components/EntityList';
import EntityVisualization from './components/EntityVisualization';
import Button from './UI/Button/Button';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleCanvasVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="App">
      <EntityList></EntityList>
      {!isVisible ? (
        <Button cls='button edit' change={toggleCanvasVisibility}>Show Enetities Visualization</Button>
      ) : (
        <>
          <EntityVisualization></EntityVisualization>
          <Button cls='button ' change={toggleCanvasVisibility}>Hide Enetities Visualization</Button>
        </>
      )}

    </div>
  );
}

export default App;
