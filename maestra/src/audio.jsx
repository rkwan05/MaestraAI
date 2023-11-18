import { useState, useEffect } from 'react';
import convertTextToAudio from './eleven';

const AudioComponent = () => {
  // State variable to store URL of the audio source
  const [sourceUrl, setSourceUrl] = useState(null);

  // Asynchronous function to fetch audio data and update state variable
  const fetchAndUpdateAudioData = async () => {
    const audioData = await convertTextToAudio('Hello welcome');

    // Create a new Blob object from the fetched audio data with matching MIME type
    const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });

    // Create a URL for the audio blob
    const blobUrl = URL.createObjectURL(audioBlob);

    // Update the sourceUrl state variable with the generated URL for the audio blob
    setSourceUrl(blobUrl);
  };

  // Call the fetchAndUpdateAudioData once when the component mounts
  useEffect(() => {
    fetchAndUpdateAudioData();
  }, []);

  // Render an audio element when source URL is available
  return (
    <div>
      {sourceUrl && (
        <audio autoPlay controls>
          <source src={sourceUrl} type='audio/mpeg' />
        </audio>
      )}
    </div>
  );
};

export default AudioComponent;