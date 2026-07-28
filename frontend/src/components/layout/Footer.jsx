import Container from "./Container";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="flex flex-col items-center justify-center py-8">
          <h2 className="text-xl font-semibold">Royal Banquet Hall</h2>
          <p className="mt-2 text-sm text-gray-300">
            © 2026 Royal Banquet Hall. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;