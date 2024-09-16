export function generateVerificationCode(): string {
    // Generates a random number between 100000 and 999999
    const code = Math.floor(100000 + Math.random() * 900000); 
    return code.toString();
  }
  
  