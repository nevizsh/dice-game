import { useState, useEffect, Suspense } from 'react'; // useState sert à stocker des données qui peuvent changer
import { Canvas } from '@react-three/fiber'; // Canvas est le conteneur de la scène 3D
import Dice from './Dice';

function App() {
  const [value, setValue] = useState(1); // valeur du dé, initialisé à 1

  // Lance le dé et met à jour la valeur et l'historique
  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1; // génère un nombre aléatoire entre 1 et 6
    setValue(newValue);
    setHistory((prevHistory) => [...prevHistory, newValue]); // ajoute la nouvelle valeur à l'historique
  };

  // Historique des lancers
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('diceHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Efface l'historique des lancers
  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    localStorage.setItem('diceHistory', JSON.stringify(history));
  }, [history]);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#222' }}>
      
      <Canvas camera={{ position: [0, 2.5, 3.5] }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <Dice value={value} />
        </Suspense>
      </Canvas>

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        padding: '20px',
        borderRadius: '12px',
        color: 'white',
        width: '250px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        zIndex: 10
      }}>
        <h3 style={{ margin: '0 0 18px 0', fontSize: '18px', borderBottom: '1px solid #444', paddingBottom: '16px' }}>
          Historique des lancers
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px', minHeight: '30px', alignItems: 'center' }}>
          {history.length === 0 ? (
            <p style={{ margin: 0, fontSize: '13px', color: '#aaa', fontStyle: 'italic' }}>Aucun lancer enregistré</p>
          ) : (
            history.map((val, index) => (
              <span key={index} style={{
                backgroundColor: '#222',
                color: 'white',
                padding: '4px 9px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {val}
              </span>
            ))
          )}
        </div>

        {history.length > 0 && (
          <button onClick={clearHistory} style={{
            width: '100%',
            backgroundColor: '#d9534f',
            color: 'white',
            border: 'none',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#c9302c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#d9534f'}>
            Effacer l'historique
          </button>
        )}
      </div>

      <button onClick={rollDice} 
        style={{ 
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '18px',
          padding: '12px 28px',
          cursor: 'pointer',
          borderRadius: '30px',
          border: 'none',
          backgroundColor: '#864fd9',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
        Lancer le dé
      </button>
    </div>
  );
}

export default App;