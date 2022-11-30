export const easePosition = (startPosition: number, endPosition: number, speed: number) => startPosition * (1 - speed) + endPosition * speed;
