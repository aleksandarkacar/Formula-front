export default function ShowError({ err }) {
  return (
    <div className="show-error">
      <h1>{err.message}</h1>
      <h1 className="err">Error Code: {err.code}</h1>
      <h1>There has been an error loading data from the server</h1>
      <h1>Please try again</h1>
    </div>
  );
}
