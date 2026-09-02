const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-brown-900 mb-8">Contact Us</h1>
      <div className="max-w-3xl space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-brown-900 mb-2">Location</h3>
          <p className="text-brown-700">Kampala, Uganda</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-brown-900 mb-2">Phone</h3>
          <p className="text-brown-700">+256 XXX XXX XXX</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-brown-900 mb-2">Email</h3>
          <p className="text-brown-700">hello@loven.coffee</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
