export const simulateVehicleMovement = (currentPosition, currentInfo) => {
  const newPosition = [
    currentPosition[0] + (Math.random() - 0.5) * 0.001,
    currentPosition[1] + (Math.random() - 0.5) * 0.001
  ];

  const speed = Math.random() * 60;
  const distance = currentInfo.distance + speed / 3600;
  const battery = Math.max(0, currentInfo.battery - 0.1);

  const totalSeconds = parseInt(currentInfo.totalTime.split(':')[2]) + 1;
  const totalTime = new Date(totalSeconds * 1000).toISOString().substr(11, 8);

  const movingSeconds = speed > 1 ? parseInt(currentInfo.movingTime.split(':')[2]) + 1 : parseInt(currentInfo.movingTime.split(':')[2]);
  const movingTime = new Date(movingSeconds * 1000).toISOString().substr(11, 8);

  const idleSeconds = speed <= 1 ? parseInt(currentInfo.idleTime.split(':')[2]) + 1 : parseInt(currentInfo.idleTime.split(':')[2]);
  const idleTime = new Date(idleSeconds * 1000).toISOString().substr(11, 8);

  return {
    newPosition,
    newInfo: {
      ...currentInfo,
      speed,
      distance,
      battery,
      totalTime,
      movingTime,
      idleTime,
    }
  };
};
