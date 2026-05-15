function ProcessingScreen() {
  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center overflow-hidden">
      
      <div className="relative flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
            style={{
              animation: `snakeMove 1s ${i * 0.12}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes snakeMove {
            0%, 100% {
              transform: translateY(0px) scale(0.8);
              opacity: 0.4;
            }
            50% {
              transform: translateY(-18px) scale(1.4);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ProcessingScreen;