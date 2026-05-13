export default function ErrorBanner({ message }) {
  if (!message) return null

  return (
    <div className="alert alert-error shadow-lg w-full max-w-lg mb-4">
      <div>{message}</div>
    </div>
  )
}
