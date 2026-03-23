export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center space-y-4">
        <p className="text-6xl">📡</p>
        <h1 className="text-2xl font-bold font-heading">لا يوجد اتصال بالإنترنت</h1>
        <p className="text-muted-foreground">
          يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى
        </p>
      </div>
    </div>
  );
}
