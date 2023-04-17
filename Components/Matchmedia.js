import React from 'react'

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);
  
  React.useEffect(() => {
    function changeMatch () {
      const {matches} = matchMedia(media);
      setMatch(matches);
    };
    changeMatch();
    addEventListener('resize', changeMatch);
    return () => {
    removeEventListener('resize', changeMatch);
    }
  },[media])

  return match;
}

export default useMedia;
