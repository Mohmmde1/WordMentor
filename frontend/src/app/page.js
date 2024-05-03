import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/books-background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      className="flex flex-col h-screen overflow-hidden"
    >
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white bg-opacity-90 p-8 shadow-md rounded-md text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Word Mentor</h1>
          <p className="text-lg mb-8">Discover and learn new words from your favorite books.</p>
          <div>
            <Button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
