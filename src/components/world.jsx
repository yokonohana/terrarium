import Header from "./header.jsx";
import Footer from "./footer.jsx";

export default function World() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header />
      <main className="flex flex-col flex-1 bg-blue-100 w-full">
        <span className="text-center m-auto">
          Coming soon...
        </span>
      </main>
      <Footer />
    </div>
  );
}