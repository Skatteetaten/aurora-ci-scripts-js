export class ErrorHandler {
  public static logAndExit(error: Error): void {
    console.error((error as Error).message);
    process.exit(1);
  }
}
