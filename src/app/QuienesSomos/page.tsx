export default function Page() {
      const lrs = [
        'Like a serpent in the gardenI am truth and I am darkness I\'m an angel, I’m a demon Just depends on what you\'re feeling I\'m the fruit that was forbidden But don’t keep my evil hidden I\'m the one she was afraid of Now I\'m what your dreams are made of',
        'I\'ll show you the light With all the lights off, with all the lights off I\'ll bring you to life I\'m a holy fuck, I\'m a holy fuck ( Fuck ) ',
        'You see me begging for permission Let me free you from her prison She\'s a novice, a beginner I’m the sexorcist, the sinner I can guide you, I can teach you Honey, this is just a preview ’Cause my body\'s the communion Take a bite of what I’m doing',
        'I\'ll show you the light With all the lights off, with all the lights off I\'ll bring you to life I\'m a holy fuck, I’m a holy fuck (Fuck)',
      ];

      return (
        <>
          {lrs.map(
            (
              lr, i 
            ) => {
                      return <p key={i}>{lr}</p>;
            } 
          )}
        </>
      );
}
