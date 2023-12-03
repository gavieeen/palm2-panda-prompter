import { useState, useRef } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import './styles.css';
import kungFuPandaImage from './kung_fu_panda.png';

marked.use({
  gfm: true,
})


function App() {
  const [serverData, setServerData] = useState([{}])
  const [userPrompt, setUserPrompt] = useState('')
  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      inputRef.current.blur();
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    setServerData('');

    if (userPrompt !== '') {
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'prompt': userPrompt })
      })
        .then((res) => res.json())
        .then((data) => {
          const html = DOMPurify.sanitize(marked(data));
          setServerData({ ...data, html });
          inputRef.current.focus();
          setUserPrompt('');
        });
    }
  };

  return (
    <main style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Kung Fu Panda image */}
        <img src={kungFuPandaImage} alt="Kung Fu Panda" style={{ width: '50px', height: '50px', marginRight: '5px', marginLeft: '10px' }} />
        <h1 style={{ padding: '10px', marginBottom: '0' }}>Palm2 Panda Prompter</h1>
      </div>
      <hr style={{ margin: '0', border: 'none', height: '2px', backgroundColor: 'rgba(0, 123, 255, 1)' }} />
      <div style={{ margin: '0', flexGrow: '1', overflow: 'scroll' }}>
        <div class="border-opacity-100" color="info"></div>
        <div style={{ width: '100%', height: '100%' }}>
          {
            (serverData === '') ? ('Loading...') :
              <article style={{ margin: '0' }} dangerouslySetInnerHTML={{ __html: serverData.html }} />
          }
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'end', backgroundColor: '#222', padding: '10px' }}>
        <textarea onChange={(e) => setUserPrompt(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef} value={userPrompt} style={{ margin: '0', flexGrow: '1', overflowY: 'hidden' }} placeholder='Type in Prompt . . .' />
        <button onClick={handleSubmit} style={{ margin: '0', flex: '1', marginLeft: '10px' }}>SKADOOSH</button>
      </div>
    </main>
  )
}

export default App